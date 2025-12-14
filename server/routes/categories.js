import express from 'express';
import { body } from 'express-validator';
import * as categoryController from '../controllers/categoryController.js';
import { validate } from '../middleware/validator.js';

const router = express.Router();

router.get('/', categoryController.getCategories);

router.get('/:id', categoryController.getCategory);

router.post('/',
  body('name').trim().notEmpty().withMessage('カテゴリ名は必須です').isLength({ max: 50 }).withMessage('カテゴリ名は50文字以内にしてください'),
  body('color').optional().matches(/^#[0-9A-Fa-f]{6}$/).withMessage('色は16進数カラーコード形式（#RRGGBB）で指定してください'),
  validate,
  categoryController.createCategory
);

router.put('/:id',
  body('name').optional().trim().notEmpty().withMessage('カテゴリ名は空にできません').isLength({ max: 50 }).withMessage('カテゴリ名は50文字以内にしてください'),
  body('color').optional().matches(/^#[0-9A-Fa-f]{6}$/).withMessage('色は16進数カラーコード形式（#RRGGBB）で指定してください'),
  validate,
  categoryController.updateCategory
);

router.delete('/:id', categoryController.deleteCategory);

export default router;
