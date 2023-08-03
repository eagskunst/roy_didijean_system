const express = require('express')
const { createClientSchema, deleteClientSchema, updateClientSchema } = require('../../schemas/user')
const ClientService = require('../../services/user/client.service')
const adminRouteMiddleWare = require('../../middlewares')

const router = express.Router()
const clientService = new ClientService()

router.post("/create", adminRouteMiddleWare(createClientSchema), async (req, res, next) => {
    try {
        const body = req.body
        const newClient = await clientService.create(body)
        res.status(201).json({
            message: 'client created',
            data: newClient
        })
    } catch (error) {
        next(error)
    }
})

router.delete("/", adminRouteMiddleWare(updateClientSchema), async (req, res, next) => {
    try {
        const body = req.body
        const deletedClient = await clientService.deleteClientByCedula(body.cedula)
        if (!deletedClient) {
            throw boom.notFound(`Client not found`);
        }
        delete deletedClient.dataValues.user_id
        delete deletedClient.user.dataValues.password
        res.status(201).json({
            message: 'client deleted',
            data: deletedClient
        })
    } catch (error) {
        next(error)
    }
})

router.patch("/", adminRouteMiddleWare(updateClientSchema), async (req, res, next) => {
    try {
        const body = req.body
        const updatedClient = await clientService.updateClientByCedula(body)
        if (!updatedClient) {
            throw boom.notFound(`Client not found`);
        }
        res.status(201).json({
            message: 'client updated',
            data: updatedClient
        })
    } catch (error) {
        next(error)
    }
})

module.exports = router