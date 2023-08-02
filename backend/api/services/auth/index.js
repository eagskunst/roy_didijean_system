const UserService = require("../user");
const jwt = require('jsonwebtoken')
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { config } = require("../../config/config");

const userService = new UserService()

class AuthService {
  constructor(){}

  async getUser(email, password){
    const user = await userService.findByEmail(email);
    if (!user) {
      throw (boom.unauthorized(), false);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw (boom.unauthorized(), false);
    }
    delete user.dataValues.password;
    return user;
  }

  signToken(user){
    const token = jwt.sign({
      sub: user.id,
    }, config.secretKey)
    return {
      user,
      token
    }
  }
}

module.exports = AuthService;
