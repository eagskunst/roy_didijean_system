const { User, UserSchema } = require("./user.model");
const { Admin, AdminSchema } = require("./admin.model")

function setupModels(sequelize){
  User.init(UserSchema, User.config(sequelize))
  Admin.init(AdminSchema, Admin.config(sequelize))
}

module.exports = setupModels
