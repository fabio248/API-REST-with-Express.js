import { Router } from 'express';
import faker from 'faker';
import validatorHandler from '../middlewares/validator.handle.js';
import CustomerService from '../services/customer.service.js';
import {
  createCustomerSchema,
  getCustomerSchema,
  updateCustomerSchema,
} from '../schemas/customer.schema.js';
const router = Router();
const service = new CustomerService();

router.get('/', async (req, res, next) => {
  try {
    const customers = await service.find();
    res.status(200).json(customers);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const customer = await service.findOne(id);
      res.status(200).json(customer);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const id = faker.datatype.uuid();
      const body = req.body;
      const data = { id, ...body };
      const customer = await service.create(data);
      res.status(201).json({
        message: 'Created',
        customer,
      });
    } catch (error) {
      next(error);
    }
  }
);
/**
 * Actualización completa del producto
 */
router.patch(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const changeCustomer = await service.update(id, body);
      res.json({ message: 'Updated', data: changeCustomer });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(200).json({ message: 'deleted customer', id });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
