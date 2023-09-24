const { Model, DataTypes, Sequelize} = require('sequelize')
const { USER_TABLE } = require('./user.model')

const CLIENT_TABLE = "clients"

const ClientSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  user_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      references: {
          model: USER_TABLE,
          key: 'id'
      },
      onDelete: 'CASCADE'
  },
  cedula: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
  },
  address: {
      allowNull: false,
      type: DataTypes.STRING
  },
  cellphone_number: {
      allowNull: true,
      type: DataTypes.STRING
  },
  created_date: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
}

class Client extends Model {
    static associate(models) {
        this.belongsTo(models.User, {
            as: "user",
            foreignKey: "user_id",
            allowNull: false
         })
         this.hasMany(models.Transaction, {
          as: 'transaction',
          foreignKey: 'client_id'
        })
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: CLIENT_TABLE,
            modelName: 'Client',
            timestamps: false
        }
    }
}

module.exports = { CLIENT_TABLE, ClientSchema, Client }
