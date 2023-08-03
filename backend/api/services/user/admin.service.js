const UserService = require('.');
const { models } = require('../../lib/sequelize')

class AdminService extends UserService {
    constructor() {
        super()
    }

    async create(data) {
        const res = await super.create(data.user)
        const admin = await models.Admin.create({
            "user_id": res.id,
            "username": data.username
        });
        return admin;
    }
}

module.exports = AdminService