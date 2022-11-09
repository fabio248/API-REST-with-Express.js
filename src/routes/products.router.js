import { Router } from 'express';
import ProductsService from '../services/products.service.js';
import validatorHandler from '../middlewares/validator.handle.js';
import {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} from '../schemas/product.schema.js';

const router = Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.status(200).json(products);
});

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
      const body = req.body;
      const product = await service.create(body);
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
      res.json({
        message: 'update complete',
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }
);
/**
 * Actualización parcial del producto
 *
 */
router.put('/:id', async (req, res, next) => {
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
});
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.delete(id);
    res.status(200).json({
      message: 'delete',
      id: product,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
