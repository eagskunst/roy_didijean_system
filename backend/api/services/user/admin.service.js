const UserService = require('.');
const sequelize = require('../../lib/sequelize')
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
            transaction.commit()
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
            },
            include: {
                model: models.User,
                as: 'user'
            }
        })
        return admin
    }

    async delete(username) {
        const admin = await this.findByUsername(username)
        if (!admin) {
            return admin
        }
        const user = admin.user
        const adminDeletedResult = await admin.destroy()
        await user.destroy()
        return adminDeletedResult
    }

    async updateAdminByUsername(data) {
        const admin = await this.findByUsername(data.username)
        if (!admin || !admin.user) {
            return admin
        }
        await admin.update({
            username: data.newUsername
        })
        await admin.user.update({
            name: data.name
        })
        return admin
    }
}

module.exports = AdminService