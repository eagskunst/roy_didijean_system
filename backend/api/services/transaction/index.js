const {models} = require('../../lib/sequelize')

class TransactionService {

  constructor(){
  }

  async create(data) {
    const newTransaction = await models.Transaction.create(data);
    return newTransaction;
  }

  async addProduct(data) {
    const newProduct = await models.Bill.create(data);
    return newProduct;
  }

  async findByClient(clientId) {
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


  async find() {
    const orders = await models.Transaction.findAll({
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

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

}

module.exports = TransactionService;
