const { Model, DataTypes, Sequelize} = require('sequelize')
const { USER_TABLE } = require('./user.model')

const CLIENT_TABLE = "clients"

const ClientSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
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
