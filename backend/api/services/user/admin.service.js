const UserService = require('.');
const sequelize = require('../../lib/sequelize')
const boom = require('@hapi/boom');
const models = sequelize.models;

class AdminService extends UserService {
    constructor() {
        super()
    }

    async create(data, t) {
        let transaction
        try {
            transaction = t ?? await sequelize.transaction();
            const res = await super.create(data.user, transaction)
            const admin = await models.Admin.create({
                "user_id": res.id,
                "username": data.username
            }, { transaction })
            return admin
        } catch(error) {
            if (transaction) {
                transaction.rollback()
            }
            throw error
        }
    }

    async findByUsername(username) {
        const admin = await models.Admin.findOne({
            where: {
                username: username
            }
        })
        if (!admin) {
            return admin
        }
        const user = await super.findOne(admin.user_id)
        return user
    }
}

module.exports = AdminService