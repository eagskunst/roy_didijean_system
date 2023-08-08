const { Model, DataTypes, Sequelize } = require('sequelize')

const ADMIN_TABLE = 'admins'

const AdminSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  user_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
  },
  username: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
  },
  created_date: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
}

class Admin extends Model {
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
            tableName: ADMIN_TABLE,
            modelName: 'Admin',
            timestamps: false
        }
    }
}

module.exports = { ADMIN_TABLE, AdminSchema, Admin }
