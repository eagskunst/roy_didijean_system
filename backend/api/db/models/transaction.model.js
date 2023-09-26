const { Model, DataTypes, Sequelize} = require('sequelize')
const { CLIENT_TABLE } = require('./client.model')
const { PROVIDER_TABLE } = require('./provider.model')

const TRANSACTION_TABLE = "transaction"

const TransactionSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  client_id: {
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
        model: CLIENT_TABLE,
        key: 'id'
    },
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  },
  provider_id: {
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
        model: PROVIDER_TABLE,
        key: 'id'
    },
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  },
  currency: {
    allowNull: false,
    type: DataTypes.ENUM(['usd', 'cop', 'ves'])
  },
  payment_method: {
    allowNull: false,
    type: DataTypes.ENUM(['cash', 'card', 'transfer', 'movil'])
  },
  data_payment: {
    allowNull: true,
    type: DataTypes.STRING
  },
  created_date: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  total: {
    type: DataTypes.INTEGER,
  }
}

class Transaction extends Model {
    static associate(models) {
        this.belongsTo(models.Client, {
            as: "client",
            foreignKey: "client_id",
            allowNull: true
         })
         this.belongsTo(models.Provider, {
          as: "provider",
          foreignKey: "provider_id",
          allowNull: true
        })
         this.belongsToMany(models.Product, {
          as: 'product',
          through: models.Bill,
          foreignKey: 'transaction_id',
          otherKey: 'product_id'
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: TRANSACTION_TABLE,
            modelName: 'Transaction',
            timestamps: false
        }
    }
}

module.exports = { TRANSACTION_TABLE, TransactionSchema, Transaction }
