import Joi from 'joi';
export const schemaCreateUser = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    organization: Joi.string().required()
})