import { Router } from 'express';
import faker from 'faker';
import { createOrderSchema, getOrderSchema } from '../schemas/order.schema.js';
import validatorHandler from '../middlewares/validator.handle.js';
import OrderService from '../services/order.service.js';
import { createOrderProductSchema } from '../schemas/order-product.schema.js';

const router = Router();
const service = new OrderService();

router.get('/', async (req, res, next) => {
  try {
    const orders = await service.find();
    res.status(200).json({ orders });
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.status(200).json({ order });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const id = faker.datatype.uuid();
      const newOrder = await service.create({ id, ...body });
      res.status(201).json({
        message: 'Created',
        newOrder,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/add-item',
  validatorHandler(createOrderProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const id = faker.datatype.uuid();
      const newItem = await service.addItem({ id, ...body });
      res.status(201).json({
        message: 'Created',
        newOrder: newItem,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
