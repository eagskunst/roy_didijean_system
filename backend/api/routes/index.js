const express = require('express')

const adminRouter = require('./users')
const authRouter = require('./auth')

function routerApi(app) {
  const router = express.Router()
  app.use('/api', router)

  router.use('/admin', adminRouter)
  router.use('/auth', authRouter)
}

module.exports = routerApi
