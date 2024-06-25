const {models} = require('../../lib/sequelize');
const ProductsService = require('../products');
const boom = require('@hapi/boom');
const ClientService = require('../user/client.service');
const ProviderService = require('../provider');

class TransactionService {
  productService;
  clientService;
  providerService;

  constructor(){
    this.productService = new ProductsService;
    this.clientService = new ClientService
    this.providerService = new ProviderService
  }

  async create(data) {
    console.log(data)
    if(!data.client_id && !data.provider_id) throw boom.notAcceptable('require client or provider for transaction')
    if(data.products == null || data.products.length <= 0) throw boom.notAcceptable('at least one product is needed for a transaction')
    data.products.forEach(product => {
      if(product.product_quantity < 0) {
        throw boom.notAcceptable('quantity for Product 1 unavailable')
      }
    });
    if (data.client_id){//VENTA cliente

      const auxclient = await this.clientService.findOne(data.client_id)
      if(!auxclient) throw boom.notAcceptable(`client not found`)

      for(let i = 0; i < data.products.length; i++ ){
        const availableAmount = await this.productService.findOne(data.products[i].product_id)
        if(!availableAmount) throw boom.notAcceptable(`product dont exist`)
        if (data.products[i].product_quantity > availableAmount.quantity_in_stock) throw boom.notAcceptable(`quantity for ${availableAmount.name} unavailable`)
      }

      const newTransaction = await models.Transaction.create({
        client_id: data.client_id,
        currency: data.currency,
        payment_method: data.payment_method,
        data_payment: data.data_payment
      });

      for(let i = 0; i < data.products.length; i++ ){
        const availableAmount =  await this.productService.findOne(data.products[i].product_id)
        availableAmount.quantity_in_stock = availableAmount.quantity_in_stock - data.products[i].product_quantity
        await models.Bill.create({
          transaction_id: newTransaction.id,
          product_id: data.products[i].product_id,
          product_quantity: data.products[i].product_quantity
        });
        await this.productService.update(availableAmount.id, {quantity_in_stock: availableAmount.quantity_in_stock})
      }
      return newTransaction;
    }else{//COMPRA proveedor

      const auxProvider = await this.providerService.findOne(data.provider_id)
      if(!auxProvider) throw boom.notAcceptable(`provider not found`)

      for(let i = 0; i < data.products.length; i++ ){
        const availableAmount =  await this.productService.findOne(data.products[i].product_id)
        if (!availableAmount){
          throw boom.notAcceptable(`product dont exist`)
        }
      }
      const newTransaction = await models.Transaction.create({
        provider_id: data.provider_id,
        currency: data.currency,
        payment_method: data.payment_method,
        data_payment: data.data_payment
      });

      for(let i = 0; i < data.products.length; i++ ){
        const availableAmount =  await this.productService.findOne(data.products[i].product_id)
        availableAmount.quantity_in_stock = availableAmount.quantity_in_stock + data.products[i].product_quantity
        console.log('data product  ',data.products[i])
        await models.Bill.create({
          transaction_id: newTransaction.id,
          product_id: data.products[i].product_id,
          product_quantity: data.products[i].product_quantity
        });
        await this.productService.update(availableAmount.id, {quantity_in_stock: availableAmount.quantity_in_stock})
      }
      return newTransaction;
    }
  }

  async findClientsById(clientId) {
    const orders = await models.Transaction.findAll({
      where: {
        '$client.id$': clientId
      },
      include: [
        {
          association: 'client',
          include: ['user']
        },
        'product'
      ]
    });
    return orders;
  }

  async findProviderById(providerId) {
    const orders = await models.Transaction.findAll({
      where: {
        '$provider.id$': providerId
      },
      include: [
        {
          association: 'provider'
        },
        'product'
      ]
    });
    return orders;
  }

  async find() {
    const orders = await models.Transaction.findAll({
      include: [
        'product'
      ]
    });
    return orders;
  }

  async findOne(id) {
    const Transaction = await models.Transaction.findByPk(id, {
      include: [
        {
          association: 'client',
          include: ['user']
        },
        'product'
      ]
    });
    return Transaction;
  }

}

module.exports = TransactionService;
