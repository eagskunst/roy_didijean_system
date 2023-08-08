const { Model, DataTypes, Sequelize } = require('sequelize')
const { PROVIDER_TABLE } = require('./provider.model')

const COMPANY_TABLE = 'company'

const companySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  provider_id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: {
        model: PROVIDER_TABLE,
        key: 'id'
    },
    onDelete: 'CASCADE'
  },
  rif: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  company_name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  created_date: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
}

class Company extends Model {
  static associate(models) {
      this.belongsTo(models.Provider, {
          as: "provider",
          foreignKey: "provider_id",
          allowNull: false
       })
  }

  static config(sequelize) {
      return {
          sequelize,
          tableName: COMPANY_TABLE,
          modelName: 'Company',
          timestamps: false
      }
  }
}

module.exports = {COMPANY_TABLE, companySchema, Company}
