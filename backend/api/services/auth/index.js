const jwt = require('jsonwebtoken')
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { config } = require("../../config/config");
const AdminService = require("../user/admin.service");

const adminService = new AdminService()

class AuthService {
  constructor(){}

  async getUser(username, password){
    const user = await adminService.findByUsername(username);
    if (!user) {
      throw boom.notFound(`User not found`);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.badRequest("Password is incorrect");
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
