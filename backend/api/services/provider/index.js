const {models} = require('../../lib/sequelize')

class ProviderService {
  constructor(){}

  async create(data) {
    const res = await models.Provider.create(data)
    return res;
  }

  async find() {
    // const client = await getConnection();
    // const rta = await client.query('SELECT * FROM tasks');
    const res = await models.Provider.findAll({
      include: []
    });
    return res;
  }

  async findOne(id) {
    const res = await models.Provider.findByPk(id)
    return res;
  }

  async findByEmail(email) {
    const res = await models.Provider.findOne({
      include: ['company', 'independent'],
      where:{
        email: email
      }
    });
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

module.exports = ProviderService
