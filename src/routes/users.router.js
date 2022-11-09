import { Router } from 'express';
import UsersService from '../services/users.service.js';

const router = Router();
const service = new UsersService();

router.get('/', (req, res) => {
  const users = service.find();
  res.status(200).json(users);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = service.findOne(id);
  if (!user)
    res.status(404).json({
      message: 'Not found',
    });
  res.status(200).json(user);
});

export default router;
