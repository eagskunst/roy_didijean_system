const joi = require('joi')

const id = joi.number().integer()
const name = joi.string().min(3)
const password = joi.string().min(8)
const email = joi.string().email()
const cedula = joi.string().max(20)
const address = joi.string().max(50)
const cellphone_number = joi.string().max(15)

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

const createClientSchema = joi.object({
    user: createUserSchema,
    cedula: cedula.required(),
    address: address.required(),
    cellphone_number: cellphone_number
})

const deleteClientSchema = joi.object({
    cedula: cedula.required()
})

const updateClientSchema = joi.object({
    cedula: cedula.required(),
    name: name.required(),
    address: address.required(),
    cellphone_number: cellphone_number
})

const deleteAdminSchema = joi.object({
    username: username.required()
})

const updateAdminSchema = joi.object({
    name: name.required(),
    username: username.required(),
    newUsername: username.required()
})

module.exports = {
    createUserSchema, getUserSchema, createAdminSchema,
    createClientSchema, deleteClientSchema, updateClientSchema, 
    deleteAdminSchema, updateAdminSchema
}