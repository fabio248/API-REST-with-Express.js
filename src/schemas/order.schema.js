import Joi from 'joi';

const id = Joi.string().uuid();
const customerId = Joi.string().uuid();

export const createOrderSchema = Joi.object({
  customerId: customerId.required(),
});

export const updateOrderSchema = Joi.object({
  customerId,
});

export const getOrderSchema = Joi.object({
  id: id.required(),
});
