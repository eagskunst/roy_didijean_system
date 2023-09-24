const { User, UserSchema } = require("./user.model");
const { Admin, AdminSchema } = require("./admin.model");
const { Client, ClientSchema } = require("./client.model");
const { Provider, providerSchema } = require("./provider.model");
const { Independent, IndependentSchema } = require("./independent.model");
const { Company, companySchema } = require("./company.model");
const { Product, ProductSchema } = require("./products.model");
const { Garment, GarmentSchema } = require("./garments.model");

function setupModels(sequelize){
  User.init(UserSchema, User.config(sequelize))
  Admin.init(AdminSchema, Admin.config(sequelize))
  Client.init(ClientSchema, Client.config(sequelize))
  Provider.init(providerSchema, Provider.config(sequelize))
  Independent.init(IndependentSchema, Independent.config(sequelize))
  Company.init(companySchema, Company.config(sequelize))
  Product.init(ProductSchema, Product.config(sequelize))
  Garment.init(GarmentSchema, Garment.config(sequelize))

  User.associate(sequelize.models)
  Admin.associate(sequelize.models)
  Client.associate(sequelize.models)
  Provider.associate(sequelize.models)
  Independent.associate(sequelize.models)
  Company.associate(sequelize.models)
  Product.associate(sequelize.models)
  Garment.associate(sequelize.models)
}

module.exports = setupModels
