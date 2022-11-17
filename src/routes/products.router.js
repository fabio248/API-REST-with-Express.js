import { Router } from 'express';
import faker from 'faker';
import ProductsService from '../services/products.service.js';
import validatorHandler from '../middlewares/validator.handle.js';
import {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
} from '../schemas/product.schema.js';

const router = Router();
const service = new ProductsService();

router.get(
  '/',
  validatorHandler(queryProductSchema, 'query'),
  async (req, res) => {
    const products = await service.find(req.query);
    res.status(200).json(products);
  }
);

//Todo lo que es especifico debe ir antes de lo que es dinámico, si no se traslapan
//Especifico
router.get('/filter', (req, res) => {
  res.send('Soy un filter');
});
//Dinámico
router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const id = faker.datatype.uuid();
      const body = req.body;
      const data = { id, ...body };
      const product = await service.create(data);
      res.status(201).json({
        message: 'created',
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }
);
/**
 * Actualización completa del producto
 *
 */
router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json({ message: 'Updated', data: product });
    } catch (error) {
      next(error);
    }
  }
);
/**
 * Actualización parcial del producto
 *
 */
router.put(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json({
        message: 'update partial',
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(200).json({
        message: 'delete',
        id,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
