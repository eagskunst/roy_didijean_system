const express = require('express')
const { createClientSchema } = require('../../schemas/user')
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

module.exports = router