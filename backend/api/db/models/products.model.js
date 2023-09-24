const bcrypt = require('bcrypt');
const { Model, DataTypes, Sequelize } = require('sequelize');

const PRODUCT_TABLE = 'products'

const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  quantity_in_stock: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  img_url: {
    allowNull: true,
    type: DataTypes.STRING
  },
  buy_cost: {
    allowNull: true,
    type: DataTypes.DECIMAL
  },
  sell_cost : {
    allowNull: true,
    type: DataTypes.DECIMAL
  },
  created_date: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
}

class Product extends Model {
  static associate(models){
    this.hasOne(models.Garment, {
      foreignKey: 'product_id',
      allowNull: true
    })
  }
  static config(sequelize){
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false
    }
  }
}

module.exports = { PRODUCT_TABLE, ProductSchema, Product }
