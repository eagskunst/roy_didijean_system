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
 * /api/transaction/clienttransaction:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: get all client transaction
 *    tags: [sell transaction]
 *    responses:
 *      200:
 *        description: get all client transaction
 */
router.get('/clienttransaction',
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
 *    summary: get client transaction by id
 *    tags: [sell transaction]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: get by transaction by client client
 */
router.get('/clienttransaction/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getTransactionSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const transaction = await service.findByClient(id);
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
 *    summary: get all products garments id
 *    tags: [sell transaction]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: get by id transaction
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
 *      required:
 *        - client_id
 *      example:
 *        client_id: 1
 */

/**
 * @swagger
 * /api/transaction/client:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: create transaction client
 *    tags: [sell transaction]
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
 *    add product:
 *      type: object
 *      properties:
 *        transaction_id:
 *          type: number
 *          description: transaction
 *        product_id:
 *          type: number
 *          description: product
 *        product_quantity:
 *          type: number
 *          description: product_quantity
 *      required:
 *        - transaction_id
 *        - product_id
 *        - product_quantity
 *      example:
 *        transaction_id: 2
 *        product_id: 4
 *        product_quantity: 5
 */

/**
 * @swagger
 * /api/transaction/client/add-product:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: add product
 *    tags: [sell transaction]
 *    requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/add product'
 *    responses:
 *      200:
 *        description: client add product ok
 */
router.post(
  '/client/add-product',
  validatorHandler(addProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.addProduct(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
