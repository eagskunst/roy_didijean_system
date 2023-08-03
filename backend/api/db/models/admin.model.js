const { Model, DataTypes, Sequelize } = require('sequelize')

const ADMIN_TABLE = 'admins'

const AdminSchema = {
    user_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    username: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
    }
}

class Admin extends Model {
    static associate() {
        //associate
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