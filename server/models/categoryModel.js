import db from '../config/database.js';

export const getAllCategories = () => {
  const stmt = db.prepare('SELECT * FROM categories ORDER BY name');
  return stmt.all();
};

export const getCategoryById = (id) => {
  const stmt = db.prepare('SELECT * FROM categories WHERE id = ?');
  return stmt.get(id);
};

export const createCategory = (name, color) => {
  const stmt = db.prepare('INSERT INTO categories (name, color) VALUES (?, ?)');
  const result = stmt.run(name, color);
  return result.lastInsertRowid;
};

export const updateCategory = (id, name, color) => {
  const updates = [];
  const values = [];

  if (name !== undefined) {
    updates.push('name = ?');
    values.push(name);
  }
  if (color !== undefined) {
    updates.push('color = ?');
    values.push(color);
  }

  if (updates.length === 0) return 0;

  values.push(id);
  const stmt = db.prepare(`UPDATE categories SET ${updates.join(', ')} WHERE id = ?`);
  const result = stmt.run(...values);
  return result.changes;
};

export const deleteCategory = (id) => {
  const stmt = db.prepare('DELETE FROM categories WHERE id = ?');
  const result = stmt.run(id);
  return result.changes;
};
