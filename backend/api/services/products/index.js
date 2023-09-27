const {models} = require('../../lib/sequelize')

class ProductsService {
  constructor(){}

  async create(data) {
    const res = await models.Product.create(data)
    return res;
  }

  async find() {
    console.log(models)
    const res = await models.Product.findAll();
    return res;
  }

  async findOne(id) {
    const res = await models.Product.findByPk(id)
    return res;
  }


  async update(id, changes) {
    const provider = await this.findOne(id);
    const res = await provider.update(changes);
    return res;
  }

  async delete(id) {
    const provider = await this.findOne(id);
    console.log(provider)
    await provider.destroy();
    return { id };
  }
}

module.exports = ProductsService
