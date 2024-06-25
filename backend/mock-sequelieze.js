const SequelizeMock = require('sequelize-mock');
const dbMock = new SequelizeMock();

const UserMock = dbMock.define('User', {
  id: 1,
  username: 'tony.stark',
  password: 'hashed_password',
  email: 'tony@stark.com',
  name: 'Tony Stark'
});

const ClientMock = dbMock.define('Client', {
  id: 1,
  address: 'las uwuquenas',
  cellphone_number: '02763422294',
  cedula: '27271032',
  user_id: 1
});

const TransactionMock = dbMock.define('Transaction', {
  id: 1,
  client_id: 1,
  provider_id: 1,
  currency: 'usd',
  payment_method: 'card',
  data_payment: '1234'
});

const BillMock = dbMock.define('Bill', {
  id: 1,
  transaction_id: 1,
  product_id: 1,
  product_quantity: 5
});

const ProductMock = dbMock.define('Product', {
  id: 1,
  name: 'Product 1',
  quantity_in_stock: 10
});

const ProviderMock = dbMock.define('Provider', {
  id: 1
});

const AdminMock = dbMock.define('Admin', {
  user_id: 1,
  username: 'adminUser',
});

ProviderMock.findByPk = async (id, options) => {
  return ProviderMock.findOne({
    where: {
      id,
    },
    ...options,
  });
};

ProductMock.findByPk = async (id, options) => {
  return ProductMock.findOne({
    where: {
      id,
    },
    ...options,
  });
};

TransactionMock.belongsTo(ClientMock, { foreignKey: 'client_id' });
TransactionMock.belongsTo(ProviderMock, { foreignKey: 'provider_id' });
TransactionMock.belongsToMany(ProductMock, { through: BillMock });
ProductMock.belongsToMany(TransactionMock, { through: BillMock });
UserMock.hasOne(ClientMock, { foreignKey: 'user_id' });
ClientMock.belongsTo(UserMock, { foreignKey: 'user_id' });
AdminMock.belongsTo(UserMock, { as: 'user', foreignKey: 'user_id' });


dbMock.transaction = jest.fn(() => ({
  commit: jest.fn(),
  rollback: jest.fn()
}));

module.exports = {
  UserMock,
  ClientMock,
  TransactionMock,
  BillMock,
  ProductMock,
  ProviderMock,
  AdminMock,
  dbMock
};