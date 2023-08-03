const joi = require('joi')

const id = joi.number().integer()
const name = joi.string().min(3)
const password = joi.string().min(8)
const email = joi.string().email()
const last_session_timestamp = joi.string()

const createUserSchema = joi.object({
    email: email.required(),
    password: password.required(),
    name: name.required()
})

const getUserSchema = joi.object({
    id: id.required()
})

const username = joi.string().min(4).max(15)

const createAdminSchema = joi.object({
    user: createUserSchema,
    username: username.required()
})

module.exports = {createUserSchema, getUserSchema, createAdminSchema }