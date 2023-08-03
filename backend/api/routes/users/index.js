const express = require('express')
const { createAdminSchema } = require('../../schemas/user')
const AdminService = require('../../services/user/admin.service')
const adminRouteMiddleWare = require('../../middlewares')

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

module.exports = router
