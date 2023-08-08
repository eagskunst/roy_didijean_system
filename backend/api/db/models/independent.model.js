const { Model, DataTypes, Sequelize } = require('sequelize')
const { PROVIDER_TABLE } = require('./provider.model')

const INDEPENDENT_TABLE = "independent"

const IndependentSchema = {
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
  cedula: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  birthDate: {
    type: DataTypes.STRING
  },
  created_date: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
}

class Independent extends Model {
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
            tableName: INDEPENDENT_TABLE,
            modelName: 'Independent',
            timestamps: false
        }
    }
}

module.exports = { INDEPENDENT_TABLE, IndependentSchema, Independent }
