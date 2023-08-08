const {models} = require('../../lib/sequelize')

class CompanyService {
  constructor(){}

  async find() {
    const rta = await models.Company.findAll({
      include: ['provider']
    });
    return rta;
  }

  async findOne(id) {
    const company = await models.Company.findByPk(id, {
      include: ['provider']
    });
    // if (!company) {
    //   throw boom.notFound('customer not found');
    // }
    return company;
  }

  async create(data) {
    const newCompany = await models.Company.create(data, {
      include: ['provider']
    });
    return newCompany;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    console.log(`client: ${model.id}`)
    console.log(`client: ${model.provider.id}`)
    const rta = await model.update({
      rif: changes.rif,
      company_name: changes.company_name
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

module.exports = CompanyService
