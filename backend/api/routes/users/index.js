const express = require('express')
const { createAdminSchema, deleteAdminSchema, updateAdminSchema } = require('../../schemas/user')
const AdminService = require('../../services/user/admin.service')
const adminRouteMiddleWare = require('../../middlewares')
const boom = require("@hapi/boom");
const { checkAuthToken } = require('../../middlewares/authHandler');

const router = express.Router()
const adminService = new AdminService()

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
 *    create admin:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *          description: username
 *        user:
 *          type: object
 *          description: user data
 *          properties:
 *            email:
 *              type: string
 *              description: admin email
 *            password:
 *              type: string
 *              description: admin password
 *            name:
 *              type: string
 *              description: admin name
 *      required:
 *        - username
 *        - user
 *      example:
 *        username: seluco
 *        user:
 *          email: hanjo@momazo.com
 *          password: '123admin'
 *          name: hanjo mora
 */

/**
 * @swagger
 * /api/admin:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: create admin
 *    tags: [admin]
 *    requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/create admin'
 *    responses:
 *      200:
 *        description: admin created ok
 */
router.post("/", adminRouteMiddleWare(createAdminSchema), async (req, res, next) => {
  try {
    const body = req.body
    const newAdmin = await adminService.create(body)
    res.status(201).json({
      message: 'admin created',
      data: newAdmin
    })
  } catch (error) {
    next(error)
  }
})

/**
 * @swagger
 * components:
 *  schemas:
 *    delete admin:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *          description: username
 *
 *      required:
 *        - username
 *      example:
 *        username: seluco
 */
/**
 * @swagger
 * /api/admin:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: delete admin
 *    tags: [admin]
 *    requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/delete admin'
 *    responses:
 *      200:
 *        description: admin deleted ok
 */
router.delete("/", adminRouteMiddleWare(deleteAdminSchema), async (req, res, next) => {
  try {
    const body = req.body
    const deletedClient = await adminService.delete(body.username)
    if (!deletedClient) {
      throw boom.notFound(`Admin not found`);
    }
    delete deletedClient.dataValues.user_id
    delete deletedClient.user.dataValues.password
    res.status(201).json({
      message: 'admin deleted',
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
 *    update admin:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *          description: username
 *        newUsername:
 *          type: string
 *          description: newUsername
 *        name:
 *          type: string
 *          description: name
 *      required:
 *        - username
 *        - newUsername
 *        - name
 *      example:
 *        username: seluco
 *        newUsername: hanjo
 *        name: Carlos Rosales
 */
/**
 * @swagger
 * /api/admin:
 *  patch:
 *    security:
 *      - bearerAuth: []
 *    summary: update admin
 *    tags: [admin]
 *    requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/update admin'
 *    responses:
 *      200:
 *        description: admin update ok
 */

router.patch("/", adminRouteMiddleWare(updateAdminSchema), async (req, res, next) => {
  try {
    const body = req.body
    const updatedAdmin = await adminService.updateAdminByUsername(body)
    if (!updatedAdmin) {
      throw boom.notFound(`Admin not found`);
    }
    delete updatedAdmin.dataValues.user_id
    delete updatedAdmin.user.dataValues.password
    res.status(201).json({
      message: 'client updated',
      data: updatedAdmin
    })
  } catch (error) {
    next(error)
  }
})

/**
 * @swagger
 * /api/admin:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: get all admins
 *    tags: [admin]
 *    responses:
 *      200:
 *        description: get admins
 */
router.get("/", checkAuthToken, async (req, res, next) => {
  try {
    const admins = await adminService.getAll()
    res.status(201).json({
      admins
    })
  } catch (error) {
    next(error)
  }
})

/**
 * @swagger
 * /api/admin/{username}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: get admin by username
 *    tags: [admin]
 *    parameters:
 *      - in: path
 *        name: username
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: get admin
 */
router.get("/:username", checkAuthToken, async (req, res, next) => {
  try {
    const admin = await adminService.findByUsername(req.params.username)
    if (!admin) {
      throw boom.notFound(`Admin not found`);
    }
    delete admin.dataValues.user_id
    delete admin.user.dataValues.password
    res.status(201).json({
      admin
    })
  } catch(error) {
    next(error)
  }
})

module.exports = router
