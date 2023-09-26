const { Model, DataTypes, Sequelize} = require('sequelize')
const { CLIENT_TABLE } = require('./client.model')

const TRANSACTION_TABLE = "transaction"

const TransactionSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  client_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
        model: CLIENT_TABLE,
        key: 'id'
    },
    onDelete: 'CASCADE'
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
            allowNull: false
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
