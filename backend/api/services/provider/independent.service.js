const ProviderService = require('.');
const {models} = require('../../lib/sequelize')

class IndependentService extends ProviderService {
  constructor(){
    super()
  }

  async find() {
    const rta = await models.Independent.findAll({
      include: ['provider']
    });
    return rta;
  }

  async findOne(id) {
    const independent = await models.Independent.findByPk(id, {
      include: ['provider']
    });
    // if (!independent) {
    //   throw boom.notFound('customer not found');
    // }
    return independent;
  }

  async create(data) {
    const newIndependent = await models.Independent.create(data, {
      include: ['provider']
    });
    return newIndependent;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    console.log(`client: ${model.id}`)
    console.log(`client: ${model.provider.id}`)
    const rta = await model.update({
      cedula: changes.cedula,
      birthDate: changes.birthDate
    })
    await model.provider.update(changes.provider)
    return rta;
  }

  async delete(id) {
    const model = await this.findOne(id);
    const provider = model.provider
    const result = await model.destroy();
    await provider.destroy()
    return { result: result };
  }
}

module.exports = IndependentService
