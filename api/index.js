import express from 'express';
import cors from 'cors';
import todosRouter from '../server/routes/todos.js';
import categoriesRouter from '../server/routes/categories.js';
import { errorHandler, notFound } from '../server/middleware/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
  res.json({ message: 'TODO API Server' });
});

app.use('/api/todos', todosRouter);
app.use('/api/categories', categoriesRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
