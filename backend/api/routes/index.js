const express = require('express')

const usersRouter = require('./users')
const authRouter = require('./auth')

function routerApi(app) {
  const router = express.Router()
  app.use('/api', router)

  router.use('/users', usersRouter)
  router.use('/auth', authRouter)
}

module.exports = routerApi
