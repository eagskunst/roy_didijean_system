const express = require('express');
const passport = require('passport');
const AuthService = require('../../services/auth');

const router = express.Router();
const service = new AuthService()

/**
 * @swagger
 * components:
 *  schemas:
 *    login:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *          description: register username
 *        password:
 *          type: string
 *          description: user password
 *      required:
 *        - username
 *        - password
 *      example:
 *        username: alextintor
 *        password: hanjo123
 */

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *    summary: login for authenticate user
 *    tags: [login]
 *    requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/login'
 *    responses:
 *      200:
 *        description: auth login ok
 */
router.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user
      res.json(service.signToken(user));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
