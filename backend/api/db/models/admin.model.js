const { Model, DataTypes } = require('sequelize')

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