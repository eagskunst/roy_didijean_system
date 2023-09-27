const bcrypt = require('bcrypt');
const { Model, DataTypes, Sequelize } = require('sequelize');

const PROVIDER_TABLE = 'providers'

const providerSchema = {
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
  address: {
    allowNull: false,
    type: DataTypes.STRING
  },
  phone_number : {
    type: DataTypes.STRING
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  created_date: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
}

class Provider extends Model {
  static associate(models){
    this.hasOne(models.Independent, {
      foreignKey: 'provider_id',
      allowNull: true
    })
    this.hasOne(models.Company, {
      foreignKey: 'provider_id',
      allowNull: true
    })
    this.hasMany(models.Transaction, {
      as: 'transaction',
      foreignKey: 'provider_id'
    })
  }
  static config(sequelize){
    return {
      sequelize,
      tableName: PROVIDER_TABLE,
      modelName: 'Provider',
      timestamps: false
    }
  }
}

module.exports = {providerSchema, Provider, PROVIDER_TABLE}
