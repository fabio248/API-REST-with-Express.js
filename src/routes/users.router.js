import { Router } from 'express';
import validatorHandler from '../middlewares/validator.handle.js';
import {
  createUserSchema,
  getUserSchema,
  updateUserSchema,
} from '../schemas/user.schemas.js';
import UsersService from '../services/users.service.js';
import faker from 'faker';

const router = Router();
const service = new UsersService();

router.get('/', async (req, res) => {
  const users = await service.find();
  res.status(200).json(users);
});

router.get(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const id = faker.datatype.uuid();
      const body = req.body;
      const data = { id, ...body };
      const user = await service.create(data);
      res.status(201).json({
        message: 'Created',
        user,
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
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const changeUser = await service.update(id, body);
      res.json({ message: 'Updated', data: changeUser });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(200).json({ message: 'deleted user', id });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
