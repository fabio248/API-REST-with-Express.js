import { Router } from 'express';
import faker from 'faker';
import validatorHandler from '../middlewares/validator.handle.js';
import {
  getCategorySchema,
  updateCategorySchema,
  createCategorySchema,
} from '../schemas/category.schema.js';
import CategoryService from '../services/category.service.js';

const router = Router();
const service = new CategoryService();

router.get(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.status(200).json({ category });
    } catch (error) {
      next(error);
    }
  }
);

router.get('/', async (req, res) => {
  const caterogies = await service.find();
  res.status(200).json(caterogies);
});

router.post(
  '/',
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const id = faker.datatype.uuid();
      const body = req.body;
      const data = { id, ...body };
      const product = await service.create(data);
      res.status(201).json({
        message: 'created',
        product,
      });
    } catch (error) {
      next(error);
    }
  }
);
/**
 * Actualización completa de la categoria
 *
 */
router.patch(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const changeCategory = await service.update(id, body);
      res.status(200).json({
        message: 'Updated',
        data: changeCategory,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const categoryChange = await service.update(id, body);
      res.json({
        message: 'update partial',
        categoryChange,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
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
