const express = require('express')

const adminRouter = require('./users')
const authRouter = require('./auth')
const clientRouter = require('./client')
const providerRoute = require('./providers')
const productRoute = require('./products')
const transactioRoute = require('./transaction')

function routerApi(app) {
  const router = express.Router()
  app.use('/api', router)

  router.use('/admin', adminRouter)
  router.use('/auth', authRouter)
  router.use('/client', clientRouter)
  router.use('/provider', providerRoute)
  router.use('/product', productRoute)
  router.use('/transaction', transactioRoute)
}

module.exports = routerApi
