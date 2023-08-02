const express = require('express')
const UserService = require('../../services/user')
const validatorHandler = require('../../middlewares/validatorHandler')
const { createUserSchema } = require('../../schemas/user')

const router = express.Router()
const service = new UserService()

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

module.exports = router
