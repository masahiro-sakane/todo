// In-memory storage (resets on each cold start)
let todos = [];
let nextTodoId = 1;

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const method = req.method;
  const path = req.url || '';

  // Extract ID from path if present
  const idMatch = path.match(/\/(\d+)(?:\/|$)/);
  const id = idMatch ? parseInt(idMatch[1]) : null;

  // GET /api/todos - Get all todos
  if (method === 'GET' && !id) {
    res.status(200).json({ success: true, data: todos });
    return;
  }

  // GET /api/todos/:id - Get specific todo
  if (method === 'GET' && id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      res.status(200).json({ success: true, data: todo });
    } else {
      res.status(404).json({ success: false, error: 'TODOが見つかりません' });
    }
    return;
  }

  // POST /api/todos - Create new todo
  if (method === 'POST') {
    const newTodo = {
      id: nextTodoId++,
      title: req.body.title || '',
      description: req.body.description || '',
      completed: false,
      priority: req.body.priority || 'medium',
      due_date: req.body.due_date || null,
      category_id: req.body.category_id || null,
      category_name: null,
      category_color: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Add category info if category_id is provided
    if (newTodo.category_id) {
      const categories = [
        { id: 1, name: '仕事', color: '#3B82F6' },
        { id: 2, name: '個人', color: '#10B981' },
        { id: 3, name: '買い物', color: '#F59E0B' },
        { id: 4, name: 'その他', color: '#6B7280' }
      ];
      const category = categories.find(c => c.id === parseInt(newTodo.category_id));
      if (category) {
        newTodo.category_name = category.name;
        newTodo.category_color = category.color;
      }
    }

    todos.push(newTodo);
    res.status(201).json({ success: true, data: newTodo });
    return;
  }

  // PATCH /api/todos/:id/toggle - Toggle completed status
  if (method === 'PATCH' && id && path.includes('/toggle')) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      todo.updated_at = new Date().toISOString();
      res.status(200).json({ success: true, data: todo });
    } else {
      res.status(404).json({ success: false, error: 'TODOが見つかりません' });
    }
    return;
  }

  // PUT /api/todos/:id - Update todo
  if (method === 'PUT' && id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      if (req.body.title !== undefined) todo.title = req.body.title;
      if (req.body.description !== undefined) todo.description = req.body.description;
      if (req.body.completed !== undefined) todo.completed = req.body.completed;
      if (req.body.priority !== undefined) todo.priority = req.body.priority;
      if (req.body.due_date !== undefined) todo.due_date = req.body.due_date;
      if (req.body.category_id !== undefined) {
        todo.category_id = req.body.category_id;
        // Update category info
        if (todo.category_id) {
          const categories = [
            { id: 1, name: '仕事', color: '#3B82F6' },
            { id: 2, name: '個人', color: '#10B981' },
            { id: 3, name: '買い物', color: '#F59E0B' },
            { id: 4, name: 'その他', color: '#6B7280' }
          ];
          const category = categories.find(c => c.id === parseInt(todo.category_id));
          if (category) {
            todo.category_name = category.name;
            todo.category_color = category.color;
          }
        } else {
          todo.category_name = null;
          todo.category_color = null;
        }
      }
      todo.updated_at = new Date().toISOString();
      res.status(200).json({ success: true, data: todo });
    } else {
      res.status(404).json({ success: false, error: 'TODOが見つかりません' });
    }
    return;
  }

  // DELETE /api/todos/:id - Delete todo
  if (method === 'DELETE' && id) {
    const index = todos.findIndex(t => t.id === id);
    if (index !== -1) {
      todos.splice(index, 1);
      res.status(200).json({ success: true, data: { message: 'TODOを削除しました' } });
    } else {
      res.status(404).json({ success: false, error: 'TODOが見つかりません' });
    }
    return;
  }

  res.status(404).json({ success: false, error: 'Not found' });
};
