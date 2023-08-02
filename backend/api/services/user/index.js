const {models} = require('./../../lib/sequelize')

class UserService {
  constructor(){}

  async create(data){
    const res = await models.User.create(data)
    return res
  }
}

module.exports = UserService
