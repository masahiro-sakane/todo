import express from 'express';
import { body } from 'express-validator';
import * as todoController from '../controllers/todoController.js';
import { validate } from '../middleware/validator.js';

const router = express.Router();

router.get('/', todoController.getTodos);

router.get('/:id', todoController.getTodo);

router.post('/',
  body('title').trim().notEmpty().withMessage('タイトルは必須です').isLength({ max: 200 }).withMessage('タイトルは200文字以内にしてください'),
  body('description').optional().trim().isLength({ max: 1000 }).withMessage('説明は1000文字以内にしてください'),
  body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('優先度は low, medium, high のいずれかを指定してください'),
  body('due_date').optional().isISO8601().withMessage('期限日は有効な日付形式（YYYY-MM-DD）で指定してください'),
  body('category_id').optional().isInt({ min: 1 }).withMessage('カテゴリIDは1以上の整数を指定してください'),
  validate,
  todoController.createTodo
);

router.put('/:id',
  body('title').optional().trim().notEmpty().withMessage('タイトルは空にできません').isLength({ max: 200 }).withMessage('タイトルは200文字以内にしてください'),
  body('description').optional().trim().isLength({ max: 1000 }).withMessage('説明は1000文字以内にしてください'),
  body('completed').optional().isBoolean().withMessage('完了状態は真偽値で指定してください'),
  body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('優先度は low, medium, high のいずれかを指定してください'),
  body('due_date').optional().isISO8601().withMessage('期限日は有効な日付形式（YYYY-MM-DD）で指定してください'),
  body('category_id').optional().isInt({ min: 1 }).withMessage('カテゴリIDは1以上の整数を指定してください'),
  validate,
  todoController.updateTodo
);

router.patch('/:id/toggle', todoController.toggleTodo);

router.delete('/:id', todoController.deleteTodo);

export default router;
