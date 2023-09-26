const Joi = require('joi');
const { createUpdateGarmentSchema } = require('../products');

const id = Joi.number().integer();
const client_id = Joi.number().integer();
const provider_id = Joi.number().integer();
const transaction_id = Joi.number().integer();
const product_id = Joi.number().integer();
const currency = Joi.string().pattern(new RegExp(/^(usd|cop|ves)$/));
const payment_method = Joi.string().pattern(new RegExp(/^(cash|card|transfer|movil)$/));
const data_payment = Joi.string().min(3).max(40);
const product_quantity = Joi.number().integer().min(1);

const getTransactionSchema = Joi.object({
  id: id.required(),
});

const createTransactionSchema = Joi.object({
  client_id: client_id,
  provider_id: provider_id,
  currency: currency.required(),
  payment_method: payment_method.required(),
  data_payment: data_payment,
  products: Joi.array().items({
    product_id: product_id.required(),
    product_quantity: product_quantity.required(),
  })
});

const addProductSchema = Joi.object({
  transaction_id: transaction_id.required(),
  product_id: product_id.required(),
  product_quantity: product_quantity.required(),
});

module.exports = { getTransactionSchema, createTransactionSchema, addProductSchema };
