const Joi = require("joi");

const type = Joi.string().pattern(new RegExp(/^(upper|lower|full)$/));
const name = Joi.string().min(3).max(40);
const size = Joi.string();
const material =  Joi.string();
const style = Joi.string()
const brand = Joi.string()
const color =  Joi.string()
const price = Joi.number().integer()
const quantity_in_stock = Joi.number().integer()
const buy_cost = Joi.number().integer()
const sell_cost = Joi.number().integer()

const getByTypeSchema = Joi.object({
  type: type.required(),
});

const createUpdateGarmentSchema = Joi.object({
  size: size,
  material: material,
  style: style,
  brand: brand,
  color: color,
  type: type.required(),
  product: Joi.object({
    name: name.required(),
    price: price.required(),
    quantity_in_stock: quantity_in_stock.required(),
    buy_cost: buy_cost.required(),
    sell_cost: sell_cost.required(),
  })
});

module.exports = { getByTypeSchema, createUpdateGarmentSchema };
