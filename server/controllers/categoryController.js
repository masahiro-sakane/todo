import * as categoryModel from '../models/categoryModel.js';

export const getCategories = (req, res, next) => {
  try {
    const categories = categoryModel.getAllCategories();
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    next(error);
  }
};

export const getCategory = (req, res, next) => {
  try {
    const { id } = req.params;
    const category = categoryModel.getCategoryById(id);

    if (!category) {
      const error = new Error('カテゴリが見つかりません');
      error.statusCode = 404;
      return next(error);
    }

    res.json({
      success: true,
      data: category
    });
  } catch (error) {
    next(error);
  }
};

export const createCategory = (req, res, next) => {
  try {
    const { name, color } = req.body;
    const id = categoryModel.createCategory(name, color || '#808080');
    const category = categoryModel.getCategoryById(id);

    res.status(201).json({
      success: true,
      data: category
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, color } = req.body;

    const changes = categoryModel.updateCategory(id, name, color);

    if (changes === 0) {
      const error = new Error('カテゴリが見つかりません');
      error.statusCode = 404;
      return next(error);
    }

    const category = categoryModel.getCategoryById(id);
    res.json({
      success: true,
      data: category
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = (req, res, next) => {
  try {
    const { id } = req.params;
    const changes = categoryModel.deleteCategory(id);

    if (changes === 0) {
      const error = new Error('カテゴリが見つかりません');
      error.statusCode = 404;
      return next(error);
    }

    res.json({
      success: true,
      data: { message: 'カテゴリを削除しました' }
    });
  } catch (error) {
    next(error);
  }
};
