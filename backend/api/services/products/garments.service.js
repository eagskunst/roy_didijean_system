const ProductsService = require('.');
const {models} = require('../../lib/sequelize')

class GarmentsService extends ProductsService {
  constructor(){
    super()
  }

  async find() {
    const rta = await models.Garment.findAll({
      include: ['product']
    });
    return rta;
  }

  async findOne(id) {
    const garment = await models.Garment.findByPk(id, {
      include: ['product']
    });
    // if (!garment) {
    //   throw boom.notFound('customer not found');
    // }
    return garment;
  }

  async create(data) {
    const newGarment = await models.Garment.create(data, {
      include: ['product']
    });
    return newGarment;
  }

  async findByType(type) {
    const res = await models.Garment.findOne({
      include: ['product'],
      where:{
        type: type
      }
    });
    return res;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    console.log(`client: ${model.id}`)
    console.log(`client: ${model.product.id}`)
    const rta = await model.update(changes)
    // await model.Product.update(changes.product)
    return rta;
  }

  async delete(id) {
    const model = await this.findOne(id);
    const product = model.product
    const result = await model.destroy();
    await product.destroy()
    return { result: result };
  }
}

module.exports = GarmentsService
