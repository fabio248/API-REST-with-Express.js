import Joi from 'joi';

const id = Joi.string().uuid();
const fistName = Joi.string().min(3).max(25);
const lastName = Joi.string().min(3).max(25);
const phone = Joi.string();
const userId = Joi.string().uuid();

export const createCustomerSchema = Joi.object({
  fistName: fistName.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  userId: userId.required(),
});

export const updateCustomerSchema = Joi.object({
  fistName,
  lastName,
  phone,
  userId,
});

export const getCustomerSchema = Joi.object({
  id: id.required(),
});
