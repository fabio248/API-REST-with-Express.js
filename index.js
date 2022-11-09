import express from 'express';
import routerApi from './src/routes/index.js';
import {
  errorHandler,
  logErrors,
  boomErrorHandler,
} from './src/middlewares/error.handle.js';

const app = express();

const PORT = 3000;

//middleware
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor en express');
});
routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT} `);
});
