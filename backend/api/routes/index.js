const express = require('express')

const adminRouter = require('./users')
const authRouter = require('./auth')
const clientRouter = require('./client')

function routerApi(app) {
  const router = express.Router()
  app.use('/api', router)

  router.use('/admin', adminRouter)
  router.use('/auth', authRouter)
  router.use('/client', clientRouter)
}

module.exports = routerApi
