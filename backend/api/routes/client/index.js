const express = require('express')
const { createClientSchema, deleteClientSchema, updateClientSchema } = require('../../schemas/user')
const ClientService = require('../../services/user/client.service')
const adminRouteMiddleWare = require('../../middlewares')
const boom = require("@hapi/boom");
const { checkAuthToken } = require('../../middlewares/authHandler');

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
        delete updatedClient.dataValues.user_id
        delete updatedClient.user.dataValues.password
        res.status(201).json({
            message: 'client updated',
            data: updatedClient
        })
    } catch (error) {
        next(error)
    }
})
router.get("/", checkAuthToken, async (req, res, next) => {
    try {
        const clients = await clientService.getAll()
        res.status(201).json({ clients })
    } catch (error) {
        next(error)
    }
})

router.get("/:cedula", checkAuthToken, async (req, res, next) => {
    try {
        const client = await clientService.findByCedula(req.params.cedula)
        if (!client) {
            throw boom.notFound(`Client not found`);
        }
        delete client.dataValues.user_id
        delete client.user.dataValues.password
        res.status(201).json({
            client
        })
    } catch (error) {
        next(error)
    }
})

module.exports = router