import * as todoModel from '../models/todoModel.js';

export const getTodos = (req, res, next) => {
  try {
    const filters = {
      completed: req.query.completed === 'true' ? true : req.query.completed === 'false' ? false : undefined,
      priority: req.query.priority,
      category_id: req.query.category_id ? parseInt(req.query.category_id) : undefined
    };

    const todos = todoModel.getAllTodos(filters);
    res.json({
      success: true,
      data: todos
    });
  } catch (error) {
    next(error);
  }
};

export const getTodo = (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = todoModel.getTodoById(id);

    if (!todo) {
      const error = new Error('TODOが見つかりません');
      error.statusCode = 404;
      return next(error);
    }

    res.json({
      success: true,
      data: todo
    });
  } catch (error) {
    next(error);
  }
};

export const createTodo = (req, res, next) => {
  try {
    const id = todoModel.createTodo(req.body);
    const todo = todoModel.getTodoById(id);

    res.status(201).json({
      success: true,
      data: todo
    });
  } catch (error) {
    next(error);
  }
};

export const updateTodo = (req, res, next) => {
  try {
    const { id } = req.params;
    const changes = todoModel.updateTodo(id, req.body);

    if (changes === 0) {
      const error = new Error('TODOが見つかりません');
      error.statusCode = 404;
      return next(error);
    }

    const todo = todoModel.getTodoById(id);
    res.json({
      success: true,
      data: todo
    });
  } catch (error) {
    next(error);
  }
};

export const toggleTodo = (req, res, next) => {
  try {
    const { id } = req.params;
    const changes = todoModel.toggleTodoCompleted(id);

    if (changes === 0) {
      const error = new Error('TODOが見つかりません');
      error.statusCode = 404;
      return next(error);
    }

    const todo = todoModel.getTodoById(id);
    res.json({
      success: true,
      data: todo
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = (req, res, next) => {
  try {
    const { id } = req.params;
    const changes = todoModel.deleteTodo(id);

    if (changes === 0) {
      const error = new Error('TODOが見つかりません');
      error.statusCode = 404;
      return next(error);
    }

    res.json({
      success: true,
      data: { message: 'TODOを削除しました' }
    });
  } catch (error) {
    next(error);
  }
};
