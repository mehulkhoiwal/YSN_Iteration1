const Joi = require('joi');

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
}).unknown();

module.exports = loginSchema;
