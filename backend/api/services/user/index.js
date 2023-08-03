const {models} = require('./../../lib/sequelize')

class UserService {
  constructor(){}

  async findOne(id) {
    const res = await models.User.findByPk(id)
    return res;
  }

  async create(data, transaction){
    const res = await models.User.create(data, { transaction })
    return res
  }

  async findByEmail(email){
    const res = await models.User.findOne({
      where: {
        email: email
      }
    })
    return res
  }
}

module.exports = UserService
