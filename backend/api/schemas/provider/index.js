const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string().min(10).max(40);
const lastName = Joi.string();
const phone_number =  Joi.string();
const userId = Joi.number().integer();
const email = Joi.string().email();
const address =  Joi.string().min(8)
const cedula = Joi.string().min(5)
const birthDate = Joi.string()
const rif = Joi.string().min(5)
const company_name = Joi.string().min(3)

const getBySchema = Joi.object({
  id: id.required(),
});

const createInpendentSchema = Joi.object({
  cedula: cedula.required(),
  birthDate: birthDate,
  provider: Joi.object({
    name: name.required(),
    phone_number: phone_number,
    address: address.required(),
    email: email.required(),
  })
});

const updateInpendentSchema = Joi.object({
  cedula: cedula.required(),
  birthDate: birthDate,
  provider: Joi.object({
    name: name.required(),
    phone_number: phone_number,
    address: address.required(),
    email: email.required(),
  })
});

const createCompanySchema = Joi.object({
  rif: rif.required(),
  company_name: company_name.required(),
  provider: Joi.object({
    name: name.required(),
    phone_number: phone_number,
    address: address.required(),
    email: email.required(),
  })
});

const updateCompanySchema = Joi.object({
  rif: rif.required(),
  company_name: company_name.required(),
  provider: Joi.object({
    name: name.required(),
    phone_number: phone_number,
    address: address.required(),
    email: email.required(),
  })
});

module.exports = { getBySchema, createInpendentSchema, updateInpendentSchema, createCompanySchema, updateCompanySchema };
