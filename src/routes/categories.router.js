import { Router } from 'express';

const router = Router();

router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({ categoryId, productId, name: 'Producto 1', price: 150 });
});

router.post('/', (req, res) => {
  const body = req.body;
  res.json({
    message: 'created',
    body,
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'update partial',
    body,
    id,
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'update',
    body,
    id,
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'delete',
    id,
  });
});

export default router;
