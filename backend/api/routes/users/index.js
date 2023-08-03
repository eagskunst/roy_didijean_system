const express = require('express')
const UserService = require('../../services/user')
const validatorHandler = require('../../middlewares/validatorHandler')
const { createUserSchema, createAdminSchema } = require('../../schemas/user')
const AdminService = require('../../services/user/admin.service')

const router = express.Router()
const service = new UserService()
const adminService = new AdminService()

router.post("/", validatorHandler(createUserSchema,'body'),async (req, res, next)=>{
  try {
    const body = req.body
    const newUser = await service.create(body)
    res.status(201).json({
      message: 'user created',
      data: newUser
    })
  } catch (error) {
    next(error)
  }
})

router.post("/admin/create", validatorHandler(createAdminSchema), async (req, res, next) => {
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
