import db from '../config/database.js';

export const getAllTodos = (filters = {}) => {
  let query = `
    SELECT todos.*, categories.name as category_name, categories.color as category_color
    FROM todos
    LEFT JOIN categories ON todos.category_id = categories.id
  `;

  const conditions = [];
  const values = [];

  if (filters.completed !== undefined) {
    conditions.push('todos.completed = ?');
    values.push(filters.completed ? 1 : 0);
  }

  if (filters.priority) {
    conditions.push('todos.priority = ?');
    values.push(filters.priority);
  }

  if (filters.category_id) {
    conditions.push('todos.category_id = ?');
    values.push(filters.category_id);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  query += ' ORDER BY todos.created_at DESC';

  const stmt = db.prepare(query);
  return stmt.all(...values);
};

export const getTodoById = (id) => {
  const stmt = db.prepare(`
    SELECT todos.*, categories.name as category_name, categories.color as category_color
    FROM todos
    LEFT JOIN categories ON todos.category_id = categories.id
    WHERE todos.id = ?
  `);
  return stmt.get(id);
};

export const createTodo = (todoData) => {
  const { title, description, priority, due_date, category_id } = todoData;
  const stmt = db.prepare(`
    INSERT INTO todos (title, description, priority, due_date, category_id)
    VALUES (?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    title,
    description || null,
    priority || 'medium',
    due_date || null,
    category_id || null
  );
  return result.lastInsertRowid;
};

export const updateTodo = (id, todoData) => {
  const updates = [];
  const values = [];

  if (todoData.title !== undefined) {
    updates.push('title = ?');
    values.push(todoData.title);
  }
  if (todoData.description !== undefined) {
    updates.push('description = ?');
    values.push(todoData.description);
  }
  if (todoData.completed !== undefined) {
    updates.push('completed = ?');
    values.push(todoData.completed ? 1 : 0);
  }
  if (todoData.priority !== undefined) {
    updates.push('priority = ?');
    values.push(todoData.priority);
  }
  if (todoData.due_date !== undefined) {
    updates.push('due_date = ?');
    values.push(todoData.due_date);
  }
  if (todoData.category_id !== undefined) {
    updates.push('category_id = ?');
    values.push(todoData.category_id);
  }

  if (updates.length === 0) return 0;

  updates.push('updated_at = CURRENT_TIMESTAMP');
  values.push(id);

  const stmt = db.prepare(`UPDATE todos SET ${updates.join(', ')} WHERE id = ?`);
  const result = stmt.run(...values);
  return result.changes;
};

export const toggleTodoCompleted = (id) => {
  const stmt = db.prepare(`
    UPDATE todos
    SET completed = NOT completed, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `);
  const result = stmt.run(id);
  return result.changes;
};

export const deleteTodo = (id) => {
  const stmt = db.prepare('DELETE FROM todos WHERE id = ?');
  const result = stmt.run(id);
  return result.changes;
};
