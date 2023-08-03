const { Model, DataTypes } = require('sequelize')

const CLIENT_TABLE = "clients"

const ClientSchema = {
    user_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER
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
    }
}

class Client extends Model {
    static associate() {
        // associate
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