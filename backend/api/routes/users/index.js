const express = require('express')
const { createAdminSchema, deleteAdminSchema, updateAdminSchema } = require('../../schemas/user')
const AdminService = require('../../services/user/admin.service')
const adminRouteMiddleWare = require('../../middlewares')
const boom = require("@hapi/boom");

const router = express.Router()
const adminService = new AdminService()

router.post("/create", adminRouteMiddleWare(createAdminSchema), async (req, res, next) => {
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

router.patch("/", adminRouteMiddleWare(updateAdminSchema), async (req, res, next) => {
  try {
    const body = req.body
    const updatedAdmin = await adminService.updateAdminByUsername(body)
    if (!updatedAdmin) {
      throw boom.notFound(`Client not found`);
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

module.exports = router
