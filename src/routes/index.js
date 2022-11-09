import productRouter from './products.router.js';
import userRouter from './users.router.js';
import categoryRouter from './categories.router.js';
import express from 'express';

function routerApi(app) {
  const router = express.Router();

  app.use('/api/v1/', router);
  router.use('/products', productRouter);
  router.use('/users', userRouter);
  router.use('/categories', categoryRouter);
}

export default routerApi;
