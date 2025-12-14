import { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import './TodoList.css';

const TodoList = () => {
  const { todos, loading, error } = useTodos();
  const [editingTodo, setEditingTodo] = useState(null);

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  if (loading && todos.length === 0) {
    return (
      <div className="todo-list-container">
        <div className="loading">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="todo-list-container">
      <TodoForm editingTodo={editingTodo} onCancel={handleCancelEdit} />

      {error && (
        <div className="error-banner">
          エラー: {error}
        </div>
      )}

      <div className="todo-list-header">
        <h3>TODO一覧</h3>
        <span className="todo-count">
          {todos.filter(t => !t.completed).length} / {todos.length} 件
        </span>
      </div>

      {todos.length === 0 ? (
        <div className="empty-state card">
          <p>TODOがありません</p>
          <p className="empty-state-hint">上のフォームから新しいTODOを追加してください</p>
        </div>
      ) : (
        <div className="todo-list">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;
