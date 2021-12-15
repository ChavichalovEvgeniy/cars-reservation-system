import Joi from 'joi';

export const createBookingRequestSchema = Joi.object().keys({
  start: Joi.string().required(),
  end: Joi.string().required(),
  tariffId: Joi.string().guid().required()
});
