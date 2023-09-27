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

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 */
/**
 * @swagger
 * /api/provider:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: get all providers
 *    tags: [providers]
 *    responses:
 *      200:
 *        description: get clients
 */
router.get('/', passport.authenticate('jwt', {session: false}), async(req, res, next) => {
  try {
    const data = await providerService.find()
    res.json({
      data: data
    })
  } catch (error) {
    next(error)
  }
})

/**
 * @swagger
 * /api/provider/allbyid/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: get provider by id
 *    tags: [providers]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: get providers
 */
router.get('/allbyid/:id', passport.authenticate('jwt', {session: false}), validatorHandler(getBySchema, 'params'), async(req, res, next) => {
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

/**
 * @swagger
 * /api/provider/allindependent:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: get all independent providers
 *    tags: [providers]
 *    responses:
 *      200:
 *        description: get independent providers
 */
router.get('/allindependent', passport.authenticate('jwt', {session: false}), async(req, res, next) => {
  try {
    const data = await independentService.find()
    res.json({
      data: data
    })
  } catch (error) {
    next(error)
  }
})


/**
 * @swagger
 * /api/provider/allcompany:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: get all company providers
 *    tags: [providers]
 *    responses:
 *      200:
 *        description: get company providers
 */
router.get('/allcompany', passport.authenticate('jwt', {session: false}), async(req, res, next) => {
  try {
    const data = await companyService.find()
    res.json({
      data: data
    })
  } catch (error) {
    next(error)
  }
})

/**
 * @swagger
 * /api/provider/independentbyid/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: get independent by id
 *    tags: [providers]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: get independents
 */
router.get('/independentbyid/:id', passport.authenticate('jwt', {session: false}), validatorHandler(getBySchema, 'params'), async(req, res, next) => {
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

/**
 * @swagger
 * /api/provider/companybyid/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: get company by id
 *    tags: [providers]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: get companys
 */
router.get('/companybyid/:id', passport.authenticate('jwt', {session: false}), validatorHandler(getBySchema, 'params'), async(req, res, next) => {
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

/**
 * @swagger
 * components:
 *  schemas:
 *    create independent:
 *      type: object
 *      properties:
 *        birthDate:
 *          type: string
 *          description: independent birthDate number
 *        cedula:
 *          type: string
 *          description: independent cedula
 *        provider:
 *          type: object
 *          description: provider data
 *          properties:
 *            email:
 *              type: string
 *              description: independent email
 *            address:
 *              type: string
 *              description: independent address
 *            name:
 *              type: string
 *              description: independent name
 *            phone_number:
 *              type: string
 *              description: independent number
 *      required:
 *        - cedula
 *        - provider
 *      example:
 *        birthDate: '03/02/1999'
 *        cedula: '27271032'
 *        provider:
 *          email: hanjo@momazo.com
 *          address: las uwuquenas
 *          name: hanjo mora
 *          phone_number: '04147658833'
 */

/**
 * @swagger
 * /api/provider/independent:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: create independent provider
 *    tags: [providers]
 *    requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/create independent'
 *    responses:
 *      200:
 *        description: independent provider created ok
 */
router.post('/independent',
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

/**
 * @swagger
 * components:
 *  schemas:
 *    create company:
 *      type: object
 *      properties:
 *        company_name:
 *          type: string
 *          description: company company_name number
 *        rif:
 *          type: string
 *          description: company rif
 *        provider:
 *          type: object
 *          description: provider data
 *          properties:
 *            email:
 *              type: string
 *              description: company email
 *            address:
 *              type: string
 *              description: company address
 *            name:
 *              type: string
 *              description: company name
 *            phone_number:
 *              type: string
 *              description: company number
 *      required:
 *        - rif
 *        - provider
 *      example:
 *        company_name: momasoft
 *        rif: '27271032'
 *        provider:
 *          email: hanjo@momazo.com
 *          address: las uwuquenas
 *          name: hanjo mora
 *          phone_number: '04147658833'
 */

/**
 * @swagger
 * /api/provider/company:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: create company provider
 *    tags: [providers]
 *    requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/create company'
 *    responses:
 *      200:
 *        description: company provider created ok
 */
router.post('/company',
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

/**
 * @swagger
 * components:
 *  schemas:
 *    update independent:
 *      type: object
 *      properties:
 *        birthDate:
 *          type: string
 *          description: independent birthDate number
 *        cedula:
 *          type: string
 *          description: independent cedula
 *        provider:
 *          type: object
 *          description: provider data
 *          properties:
 *            email:
 *              type: string
 *              description: independent email
 *            address:
 *              type: string
 *              description: independent address
 *            name:
 *              type: string
 *              description: independent name
 *            phone_number:
 *              type: string
 *              description: independent number
 *      required:
 *        - cedula
 *        - provider
 *      example:
 *        birthDate: '03/02/1999'
 *        cedula: '27271032'
 *        provider:
 *          email: hanjo@momazo.com
 *          address: las uwuquenas
 *          name: hanjo mora
 *          phone_number: '04147658833'
 */

/**
 * @swagger
 * /api/provider/independent/{id}:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    summary: update independent provider
 *    tags: [providers]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *    requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/update independent'
 *    responses:
 *      200:
 *        description: independent provider update ok
 */
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

/**
 * @swagger
 * components:
 *  schemas:
 *    update company:
 *      type: object
 *      properties:
 *        company_name:
 *          type: string
 *          description: company company_name number
 *        rif:
 *          type: string
 *          description: company rif
 *        provider:
 *          type: object
 *          description: provider data
 *          properties:
 *            email:
 *              type: string
 *              description: company email
 *            address:
 *              type: string
 *              description: company address
 *            name:
 *              type: string
 *              description: company name
 *            phone_number:
 *              type: string
 *              description: company number
 *      required:
 *        - rif
 *        - provider
 *      example:
 *        company_name: momasoft
 *        rif: '27271032'
 *        provider:
 *          email: hanjo@momazo.com
 *          address: las uwuquenas
 *          name: hanjo mora
 *          phone_number: '04147658833'
 */
/**
 * @swagger
 * /api/provider/company/{id}:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    summary: update company provider
 *    tags: [providers]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *    requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/update company'
 *    responses:
 *      200:
 *        description: company provider update ok
 */
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

/**
 * @swagger
 * /api/provider/company/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: get provider by id
 *    tags: [providers]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: get providers
 */
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

/**
 * @swagger
 * /api/provider/independent/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: get provider by id
 *    tags: [providers]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: get providers
 */
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
