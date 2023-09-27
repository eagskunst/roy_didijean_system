const express = require('express');
const passport = require('passport');
const TransactionService = require('../../services/transaction');
const validatorHandler = require('../../middlewares/validatorHandler');
const { getTransactionSchema, createTransactionSchema, addProductSchema } = require('../../schemas/transaction');

const router = express.Router();
const service = new TransactionService();

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
 * /api/transaction/:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: get all transactions
 *    tags: [transaction]
 *    responses:
 *      200:
 *        description: get all transactions
 */
router.get('/',
  passport.authenticate('jwt', {session: false}),
  async (req, res, next) => {
    try {
      const transaction = await service.find();
      res.json(transaction);
    } catch (error) {
      next(error);
    }
  }
);

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
 * /api/transaction/clienttransaction/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: get transaction by client id
 *    tags: [transaction]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: get transaction by client id
 */
router.get('/clienttransaction/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getTransactionSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const transaction = await service.findClientsById(id);
      res.json(transaction);
    } catch (error) {
      next(error);
    }
  }
);

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
 * /api/transaction/providertransaction/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: get transaction by client id
 *    tags: [transaction]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: get transaction by provider id
 */
router.get('/providertransaction/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getTransactionSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const transaction = await service.findProviderById(id);
      res.json(transaction);
    } catch (error) {
      next(error);
    }
  }
);

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
 * /api/transaction/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: get transaction by id
 *    tags: [transaction]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: get transaction by id
 */
router.get(
  '/:id',
  validatorHandler(getTransactionSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const transaction = await service.findOne(id);
      res.json(transaction);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * components:
 *  schemas:
 *    transaction client:
 *      type: object
 *      properties:
 *        client_id:
 *          type: number
 *          description: client id
 *        currency:
 *          type: string
 *          description: currency
 *        payment_method:
 *          type: string
 *          description: payment_method
 *        data_payment:
 *          type: string
 *          description: data_payment
 *        products:
 *          type: array
 *          items:
 *            type: object
 *            description: provider data
 *            properties:
 *              product_id:
 *                type: number
 *                description: product id
 *              product_quantity:
 *                type: number
 *                description: product quantity
 *      required:
 *        - client_id
 *        - currency
 *        - payment_method
 *        - products
 *      example:
 *        client_id: 1
 *        currency: usd
 *        payment_method: cash
 *        data_payment: '1231231231323'
 *        products:
 *          - product_id: 1
 *            product_quantity: 2
 */

/**
 * @swagger
 * /api/transaction/client:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: create transaction client
 *    tags: [transaction]
 *    requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/transaction client'
 *    responses:
 *      200:
 *        description: client transaction ok
 */
router.post(
  '/client',
  validatorHandler(createTransactionSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newTransaction = await service.create(body);
      res.status(201).json(newTransaction);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * components:
 *  schemas:
 *    transaction provider:
 *      type: object
 *      properties:
 *        provider_id:
 *          type: number
 *          description: provider id
 *        currency:
 *          type: string
 *          description: currency
 *        payment_method:
 *          type: string
 *          description: payment_method
 *        data_payment:
 *          type: string
 *          description: data_payment
 *        products:
 *          type: array
 *          items:
 *            type: object
 *            description: provider data
 *            properties:
 *              product_id:
 *                type: number
 *                description: product id
 *              product_quantity:
 *                type: number
 *                description: product quantity
 *      required:
 *        - provider_id
 *        - currency
 *        - payment_method
 *        - products
 *      example:
 *        provider_id: 1
 *        currency: usd
 *        payment_method: cash
 *        data_payment: '1231231231323'
 *        products:
 *          - product_id: 1
 *            product_quantity: 2
 */

/**
 * @swagger
 * /api/transaction/provider:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: create transaction provider
 *    tags: [transaction]
 *    requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/transaction provider'
 *    responses:
 *      200:
 *        description: client transaction provider ok
 */
router.post(
  '/provider',
  validatorHandler(createTransactionSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
