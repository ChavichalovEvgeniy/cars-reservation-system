import Joi from 'joi';

export const createCarRequestSchema = Joi.object().keys({
  model: Joi.string().required(),
  brand: Joi.string().required(),
  plate: Joi.string().required(),
  vin: Joi.string().required()
});
