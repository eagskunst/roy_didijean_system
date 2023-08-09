const { where } = require('sequelize');
const UserService = require('.');
const sequelize = require('../../lib/sequelize')
const models = sequelize.models;

class ClientService extends UserService {
    constructor() {
        super()
    }

    async create(data, t) {
        let transaction
        try {
            transaction = t ?? await sequelize.transaction();
            const res = await super.create(data.user, transaction)
            data.user_id = res.id
            const client = await models.Client.create(data, { transaction })
            transaction.commit()
            return client
        } catch (error) {
            if (transaction) {
                transaction.rollback()
            }
            throw error
        }
    }

    async findByCedula(cedula) {
        const client = await models.Client.findOne({
            where: {
                cedula: cedula
            },
            include: {
                model: models.User,
                as: 'user'
            }
        })
        return client
    }

    async deleteClientByCedula(cedula) {
        const client = await this.findByCedula(cedula)
        if (!client) {
            return client
        }
        const user = client.user
        const clientDeletedResult = await client.destroy()
        await user.destroy()
        return clientDeletedResult
    }

    async updateClientByCedula(data) {
        const client = await this.findByCedula(data.cedula)
        console.log(`client: ${client.user}`)
        if (!client || !client.user) {
            return client
        }
        await client.update(
            {
                address: data.address,
                cellphone_number: data.cellphone_number
            }
        )
        await client.user.update({
            name: data.name
        })
        return client
    }

    async getAll() {
        return await models.Client.findAll({
            attributes: {
                exclude: ['user_id']
            },
            include: {
                model: models.User,
                as: 'user',
                attributes:  {
                    exclude: ['password']
                }
            }
        })
    }
}

module.exports = ClientService
