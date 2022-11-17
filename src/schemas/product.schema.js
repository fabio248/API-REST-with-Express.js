import Joi from 'joi';

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(25);
const price = Joi.number().positive().min(5);
const image = Joi.string().uri();
const description = Joi.string().min(10);
const categoryId = Joi.string().uuid();
const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  categoryId: categoryId.required(),
});
const updateProductSchema = Joi.object({
  name,
  price,
  image,
  description,
  categoryId,
});
const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  limit,
  offset,
});

export {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
};
