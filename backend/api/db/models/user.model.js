const bcrypt = require('bcrypt');
const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users'

const UserSchema = {
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
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  created_date: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  last_session : {
    field: 'last_session_timestamp',
    type: DataTypes.DATE
  }
}

class User extends Model {
  static associate(){
    //associate
  }
  static config(sequelize){
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false,
      hooks: {
        beforeCreate: async (user) => {
          const password = await bcrypt.hash(user.password, 10)
          user.password = password
        },
        afterCreate: async (user) => {
          delete user.dataValues.password;
        },
      }
    }
  }
}

module.exports = { USER_TABLE, UserSchema, User }
