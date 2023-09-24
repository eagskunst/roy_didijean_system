const express = require('express')
const boom = require("@hapi/boom");
const validatorHandler = require('../../middlewares/validatorHandler');
const passport = require('passport');
const ProductsService = require('../../services/products');
const GarmentsService = require('../../services/products/garments.service');
const { getBySchema } = require('../../schemas/provider');

const router = express.Router()
const productService = new ProductsService()
const garmentService = new GarmentsService()

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
 * /api/product/allproducts:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: get all products
 *    tags: [products]
 *    responses:
 *      200:
 *        description: get products
 */
router.get('/allproducts', passport.authenticate('jwt', {session: false}), async(req, res, next) => {
  try {
    const data = await productService.find()
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
 *   securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 */
/**
 * @swagger
 * /api/product/allproductsbyid/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: get roducts by id
 *    tags: [products]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: get products by id
 */
router.get('/allproductsbyid/:id', passport.authenticate('jwt', {session: false}), validatorHandler(getBySchema, 'params'), async(req, res, next) => {
  try {
    const {id} = req.params
    const data = await productService.findOne(id)
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
 *   securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 */
/**
 * @swagger
 * /api/product/allproducts/garments:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: get all products garments list
 *    tags: [products]
 *    responses:
 *      200:
 *        description: get products garment list
 */
router.get('/allproducts/garments', passport.authenticate('jwt', {session: false}), async(req, res, next) => {
  try {
    const data = await garmentService.find()
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
 *   securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 */
/**
 * @swagger
 * /api/product/allproducts/garments/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: get all products garments id
 *    tags: [products]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: get products garment id
 */
router.get('/allproducts/garments/:id', passport.authenticate('jwt', {session: false}), validatorHandler(getBySchema, 'params'), async(req, res, next) => {
  try {
    const {id} = req.params
    const data = await garmentService.findOne(id)
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
 *   securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 */
/**
 * @swagger
 * /api/product/allproducts/garmentsbytype/{type}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: get all products garments type
 *    tags: [products]
 *    responses:
 *      200:
 *        description: get products garment type
 */
router.get('/allproducts/garmentsbytype/:type', passport.authenticate('jwt', {session: false}), async(req, res, next) => {
  try {
    const {type} = req.params
    const data = await garmentService.findByType(type)
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
 *    create exp:
 *      type: object
 *      properties:
 *        size:
 *          type: string
 *          description: size
 *        material:
 *          type: string
 *          description: material
 *        style:
 *          type: string
 *          description: style
 *        brand:
 *          type: string
 *          description: brand
 *        color:
 *          type: string
 *          description: color
 *        type:
 *          type: string
 *          description: type
 *        product:
 *          type: object
 *          description: product data
 *          properties:
 *            name:
 *              type: string
 *              description: company name
 *            price:
 *              type: number
 *              description: prive
 *            quantity_in_stock:
 *              type: number
 *              description: quantity_in_stock
 *            buy_cost:
 *              type: number
 *              description: buy_cost
 *            sell_cost:
 *              type: number
 *              description: sell_cost
 *      required:
 *        - type
 *        - product
 *      example:
 *        size: m
 *        material: cotton
 *        style: blouse
 *        brand: gucci
 *        color: blue
 *        type: upper
 *        product:
 *          name: blouse blue
 *          price: 100
 *          quantity_in_stock: 100
 *          buy_cost: 70
 *          sell_cost: 100
 */

/**
 * @swagger
 * /api/product/garment:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: create product garment
 *    tags: [products]
 *    requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/create exp'
 *    responses:
 *      200:
 *        description: product garment created ok
 */
router.post('/garment',
  passport.authenticate('jwt', {session: false}),
  async(req, res, next) => {
  try {
    const body = req.body
    const custom = await garmentService.create(body)
    res.json({
      message: 'garment product created',
      data: custom
    })
  } catch (error) {
    next(error)
  }
})


/**
 * @swagger
 * /api/product/garment/{id}:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    summary: update garment product
 *    tags: [products]
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
 *              $ref: '#/components/schemas/create exp'
 *    responses:
 *      200:
 *        description: independent provider update ok
 */
router.put('/garment/:id', passport.authenticate('jwt', {session: false}),
   validatorHandler(getBySchema,'params'),
   async (req, res, next)=>{
  try {
    const {id} = req.params
    const body = req.body
    const custom = await garmentService.update(id, body)
    res.json({
      message: 'garment product updated',
      data: custom
    })
  } catch (error) {
    next(error)
  }
})

/**
 * @swagger
 * /api/product/garment/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: delete product by id
 *    tags: [products]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: delete products
 */
router.delete('/garment/:id', passport.authenticate('jwt', {session: false}), validatorHandler(getBySchema, 'params'), async (req, res, next)=>{
  try {
    const {id} = req.params
    const company = await garmentService.delete(id)
    res.json({
      message: 'garment deleted',
      data: company
    })
  } catch (error) {
    next(error)
  }
})
module.exports = router
