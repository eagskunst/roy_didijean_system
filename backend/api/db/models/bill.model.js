const { Model, DataTypes, Sequelize} = require('sequelize')
const { TRANSACTION_TABLE } = require("./transaction.model")
const { PRODUCT_TABLE } = require('./products.model')

const BILL_TABLE = "bill"

const BillSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  product_id: {
      field: 'product_id',
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      references: {
          model: PRODUCT_TABLE,
          key: 'id'
      },
      onDelete: 'CASCADE'
  },
  transaction_id: {
    field: 'transaction_id',
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: {
      model: TRANSACTION_TABLE,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  product_quantity: {
      allowNull: false,
      type: DataTypes.INTEGER,
  },
  created_date: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
}

class Bill extends Model {

  static associate(models) {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: BILL_TABLE,
      modelName: 'Bill',
      timestamps: false
    }
  }
}

module.exports = { BILL_TABLE, BillSchema, Bill }
