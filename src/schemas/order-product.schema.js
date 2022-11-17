import Joi from 'joi';

const id = Joi.string().uuid();
const orderId = Joi.string().uuid();
const productId = Joi.string().uuid();
const amount = Joi.number().integer().min(1);

export const createOrderProductSchema = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required(),
});

export const updateOrderProductSchema = Joi.object({
  orderId,
  productId,
  amount,
});

export const getOrderProductSchema = Joi.object({
  id: id.required(),
});
