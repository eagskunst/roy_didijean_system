const Joi = require('joi');

const id = Joi.number().integer();
const client_id = Joi.number().integer();
const transaction_id = Joi.number().integer();
const product_id = Joi.number().integer();
const product_quantity = Joi.number().integer().min(1);

const getTransactionSchema = Joi.object({
  id: id.required(),
});

const createTransactionSchema = Joi.object({
  client_id: client_id.required(),
});

const addProductSchema = Joi.object({
  transaction_id: transaction_id.required(),
  product_id: product_id.required(),
  product_quantity: product_quantity.required(),
});

module.exports = { getTransactionSchema, createTransactionSchema, addProductSchema };
