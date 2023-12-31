const jwt = require('jsonwebtoken')
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { config } = require("../../config/config");
const AdminService = require("../user/admin.service");

const adminService = new AdminService()

class AuthService {
  constructor(){}

  async getUser(username, password){
    const admin = await adminService.findByUsername(username);
    if (!admin) {
      throw boom.notFound(`User not found`);
    }
    const isMatch = await bcrypt.compare(password, admin.user.password);
    if (!isMatch) {
      throw boom.badRequest("Password is incorrect");
    }
    delete admin.user.dataValues.password;
    delete admin.dataValues.user_id;
    return admin;
  }

  signToken(admin){
    const token = jwt.sign({
      sub: admin.user.id,
    }, config.secretKey, {
      // expiresIn: '1h'
    })
    return {
      admin,
      token
    }
  }
}

module.exports = AuthService;
