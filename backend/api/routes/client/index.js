const express = require('express')
const { createClientSchema, deleteClientSchema, updateClientSchema } = require('../../schemas/user')
const ClientService = require('../../services/user/client.service')
const adminRouteMiddleWare = require('../../middlewares')
const boom = require("@hapi/boom");
const { checkAuthToken } = require('../../middlewares/authHandler');
const { getBySchema } = require('../../schemas/provider');
const validatorHandler = require('../../middlewares/validatorHandler');
const passport = require('passport')

const router = express.Router()
const clientService = new ClientService()

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    create client:
 *      type: object
 *      properties:
 *        cellphone_number:
 *          type: string
 *          description: client cellphone number
 *        address:
 *          type: string
 *          description: client address
 *        cedula:
 *          type: string
 *          description: client cedula id
 *        user:
 *          type: object
 *          description: user data
 *          properties:
 *            email:
 *              type: string
 *              description: client email
 *            password:
 *              type: string
 *              description: client password
 *            name:
 *              type: string
 *              description: client name
 *      required:
 *        - address
 *        - cedula
 *        - user
 *      example:
 *        address: las uwuquenas
 *        cellphone_number: '02763422294'
 *        cedula: '27271032'
 *        user:
 *          email: hanjo@momazo.com
 *          password: '12345678'
 *          name: hanjo mora
 */

/**
 * @swagger
 * /api/client:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: create client
 *    tags: [client]
 *    requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/create client'
 *    responses:
 *      200:
 *        description: client created ok
 */
router.post("/", adminRouteMiddleWare(createClientSchema), async (req, res, next) => {
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

/**
 * @swagger
 * /api/client/{cedula}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: delete client by cedula
 *    tags: [client]
 *    parameters:
 *      - in: path
 *        name: cedula
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: delete clients
 */
router.delete("/:cedula", passport.authenticate('jwt', {session: false}), checkAuthToken, async (req, res, next) => {
    try {
      const {cedula} = req.params
        const deletedClient = await clientService.deleteClientByCedula(cedula)
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


/**
 * @swagger
 * components:
 *  schemas:
 *    update client:
 *      type: object
 *      properties:
 *        cellphone_number:
 *          type: string
 *          description: client cellphone number
 *        address:
 *          type: string
 *          description: client address
 *        cedula:
 *          type: string
 *          description: client cedula id
 *        name:
 *          type: string
 *          description: client name
 *      required:
 *        - address
 *        - cedula
 *        - name
 *      example:
 *        address: las uwuquenas
 *        cellphone_number: '02763422294'
 *        cedula: '27271032'
 *        name: hanjo mora
 */

/**
 * @swagger
 * /api/client:
 *  patch:
 *    security:
 *      - bearerAuth: []
 *    summary: update client
 *    tags: [client]
 *    requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/update client'
 *    responses:
 *      200:
 *        description: client update ok
 */
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

/**
 * @swagger
 * /api/client:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: get all clients
 *    tags: [client]
 *    responses:
 *      200:
 *        description: get clients
 */
router.get("/", checkAuthToken, async (req, res, next) => {
    try {
        const clients = await clientService.getAll()
        res.status(201).json({ clients })
    } catch (error) {
        next(error)
    }
})

/**
 * @swagger
 * /api/client/{cedula}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: get client by cedula
 *    tags: [client]
 *    parameters:
 *      - in: path
 *        name: cedula
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: get clients
 */
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
