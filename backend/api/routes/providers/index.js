const express = require('express')
const boom = require("@hapi/boom");
const validatorHandler = require('../../middlewares/validatorHandler');
const IndependentService = require('../../services/provider/independent.service');
const { createInpendentSchema, getBySchema, createCompanySchema, updateInpendentSchema, updateCompanySchema } = require('../../schemas/provider');
const ProviderService = require('../../services/provider');
const CompanyService = require('../../services/provider/company.service');
const passport = require('passport')

const router = express.Router()
const independentService = new IndependentService()
const providerService = new ProviderService()
const companyService = new CompanyService()

router.get('/', async(req, res, next) => {
  try {
    const data = await providerService.find()
    res.json({
      data: data
    })
  } catch (error) {
    next(error)
  }
})

router.get('/independent', async(req, res, next) => {
  try {
    const data = await independentService.find()
    res.json({
      data: data
    })
  } catch (error) {
    next(error)
  }
})

router.get('/company', async(req, res, next) => {
  try {
    const data = await companyService.find()
    res.json({
      data: data
    })
  } catch (error) {
    next(error)
  }
})

router.get('/independent/:id', validatorHandler(getBySchema, 'params'), async(req, res, next) => {
  try {
    const {id} = req.params
    const data = await independentService.findOne(id)
    res.json({
      data: data
    })
  } catch (error) {
    next(error)
  }
})

router.get('/company/:id', validatorHandler(getBySchema, 'params'), async(req, res, next) => {
  try {
    const {id} = req.params
    const data = await companyService.findOne(id)
    res.json({
      data: data
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:id', validatorHandler(getBySchema, 'params'), async(req, res, next) => {
  try {
    const {id} = req.params
    const data = await providerService.findOne(id)
    res.json({
      data: data
    })
  } catch (error) {
    next(error)
  }
})

router.post('/create/independent',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(createInpendentSchema, 'body'), async(req, res, next) => {
  try {
    const body = req.body
    const custom = await independentService.create(body)
    res.json({
      message: 'independent provider created',
      data: custom
    })
  } catch (error) {
    next(error)
  }
})

router.post('/create/company',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(createCompanySchema, 'body'), async(req, res, next) => {
  try {
    const body = req.body
    const custom = await companyService.create(body)
    res.json({
      message: 'company provider created',
      data: custom
    })
  } catch (error) {
    next(error)
  }
})

router.put('/independent/:id', passport.authenticate('jwt', {session: false}),
  validatorHandler(getBySchema,'params'), validatorHandler(updateInpendentSchema,'body'), async (req, res, next)=>{
  try {
    const {id} = req.params
    const body = req.body
    const custom = await independentService.update(id, body)
    res.json({
      message: 'independent updated',
      data: custom
    })
  } catch (error) {
    next(error)
  }
})

router.put('/company/:id', passport.authenticate('jwt', {session: false}),
  validatorHandler(getBySchema,'params'), validatorHandler(updateCompanySchema,'body'), async (req, res, next)=>{
  try {
    const {id} = req.params
    const body = req.body
    const custom = await companyService.update(id, body)
    res.json({
      message: 'company updated',
      data: custom
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/company/:id', passport.authenticate('jwt', {session: false}), validatorHandler(getBySchema, 'params'), async (req, res, next)=>{
  try {
    const {id} = req.params
    const company = await companyService.delete(id)
    res.json({
      message: 'company deleted',
      data: company
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/independent/:id', passport.authenticate('jwt', {session: false}), validatorHandler(getBySchema, 'params'), async (req, res, next)=>{
  try {
    const {id} = req.params
    const independent = await independentService.delete(id)
    res.json({
      message: 'independent deleted',
      data: independent
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
