const TransactionService = require('../api/services/transaction/index');
const { dbMock, TransactionMock, BillMock, ProductMock, ClientMock, ProviderMock } = require('../mock-sequelieze');
const sequelize = require('../api/lib/sequelize');
const { models } = sequelize;
const boom = require('@hapi/boom');
const validatorHandler = require('../api/middlewares/validatorHandler');
const { getTransactionSchema, createTransactionSchema, addProductSchema } = require('../api/schemas/transaction');


models.Transaction = TransactionMock
models.Bill = BillMock
models.Product = ProductMock
models.Client = ClientMock
models.Provider = ProviderMock
// jest.mock('../api/services/products', () => jest.fn().mockImplementation(() => ({
//   findOne: jest.fn((id) => {
//     const { ProductMock } = require('../mock-sequelieze')
//     if (id === 999) return null;
//     return ProductMock.findByPk(id);
//   }),
//   update: jest.fn((id, data) => {
//     const { ProductMock } = require('../mock-sequelieze')
//     ProductMock.update(data, { where: { id } })
// })
// })));

// jest.mock('../api/services/user/client.service', () => jest.fn().mockImplementation(() => ({
//   findOne: jest.fn((id) => {
//     const { ClientMock } = require('../mock-sequelieze')
//     ClientMock.findByPk(id)
// })
// })));

// jest.mock('../api/services/provider', () => jest.fn().mockImplementation(() => ({
//   findOne: jest.fn((id) => { 
//     ProviderMock.findByPk(id)
//  })
// })));

jest.mock('../api/lib/sequelize', () => {
    const { dbMock } = require('../mock-sequelieze');
    return dbMock
  });

describe('TransactionService', () => {
  let transactionService;

  beforeEach(() => {
    transactionService = new TransactionService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create a transaction for a provider with valid data', async () => {
    const data = {
      provider_id: 1,
      currency: 'usd',
      payment_method: 'card',
      data_payment: '1234',
      products: [
        {
          product_id: 1,
          product_quantity: 5
        }
      ]
    };

    const newTransaction = await transactionService.create(data);
    expect(newTransaction).toBeDefined();
    expect(newTransaction.provider_id).toBe(1);
  });

  test('should return validation error for negative product quantity', async () => {
    const data = {
      provider_id: 1,
      currency: 'usd',
      payment_method: 'cash',
      data_payment: '',
      products: [
        {
          product_id: 1,
          product_quantity: -5
        }
      ]
    };

    await expect(transactionService.create(data)).rejects.toThrow(boom.notAcceptable('quantity for Product 1 unavailable'));
  });

  test('should create a transaction for a provider with max length data_payment', async () => {
    const data = {
      provider_id: 1,
      currency: 'usd',
      payment_method: 'transfer',
      data_payment: '2'.repeat(40),
      products: [
        {
          product_id: 1,
          product_quantity: 10
        }
      ]
    };

    const newTransaction = await transactionService.create(data);
    expect(newTransaction).toBeDefined();
    expect(newTransaction.data_payment).toBe('2'.repeat(40));
  });

  test('should create a transaction for a provider with min length data_payment', async () => {
    const data = {
      provider_id: 1,
      currency: 'usd',
      payment_method: 'transfer',
      data_payment: '2'.repeat(3),
      products: [
        {
          product_id: 1,
          product_quantity: 10
        }
      ]
    };

    const newTransaction = await transactionService.create(data);
    expect(newTransaction).toBeDefined();
    expect(newTransaction.data_payment).toBe('2'.repeat(3));
  });

  test('should return error for non-existing product', async () => {
    const data = {
      provider_id: 2,
      currency: 'usd',
      payment_method: 'transfer',
      data_payment: '1234',
      products: [
        {
          product_id: 999,
          product_quantity: 10
        }
      ]
    };
    jest.spyOn(ProductMock, 'findOne').mockResolvedValueOnce(null)

    await expect(transactionService.create(data)).rejects.toThrow(boom.notAcceptable('product dont exist'));
  });

  test('should create a transaction with valid currency', async () => {
    const currencies = ['usd', 'cop', 'ves'];

    for (const currency of currencies) {
      const data = {
        provider_id: 1,
        currency,
        payment_method: 'cash',
        data_payment: '0002',
        products: [
          {
            product_id: 1,
            product_quantity: 5
          }
        ]
      };

      const newTransaction = await transactionService.create(data);
      expect(newTransaction).toBeDefined();
      expect(newTransaction.currency).toBe(currency);
    }
  });

  test('should return error for invalid currency', async () => {
    const data = {
      provider_id: 1,
      currency: 'eur',
      payment_method: 'cash',
      data_payment: '0001',
      products: [
        {
          product_id: 1,
          product_quantity: 5
        }
      ]
    };
    
    await expect(createTransactionSchema.validateAsync(data)).rejects.toThrow(boom.notAcceptable("\"currency\" with value \"eur\" fails to match the required pattern: /^(usd|cop|ves)$/"));
  });

  test('should create a transaction with valid payment_method', async () => {
    const paymentMethods = ['card', 'cash', 'transfer', 'movil'];

    for (const paymentMethod of paymentMethods) {
      const data = {
        provider_id: 1,
        currency: 'usd',
        payment_method: paymentMethod,
        data_payment: '001',
        products: [
          {
            product_id: 1,
            product_quantity: 5
          }
        ]
      };

      const newTransaction = await transactionService.create(data);
      expect(newTransaction).toBeDefined();
      expect(newTransaction.payment_method).toBe(paymentMethod);
    }
  });

  test('should return error for invalid payment_method', async () => {
    const data = {
      provider_id: 1,
      currency: 'usd',
      payment_method: 'cheque',
      data_payment: '001',
      products: [
        {
          product_id: 1,
          product_quantity: 5
        }
      ]
    };

    await expect(createTransactionSchema.validateAsync(data)).rejects.toThrow(boom.notAcceptable("\"payment_method\" with value \"cheque\" fails to match the required pattern: /^(cash|card|transfer|movil)$/"));
  });
});
