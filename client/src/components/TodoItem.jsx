import { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import PriorityBadge from './PriorityBadge';
import { formatDate, getDueDateStatus } from '../utils/dateUtils';
import './TodoItem.css';

const TodoItem = ({ todo, onEdit }) => {
  const { toggleTodo, deleteTodo } = useTodos();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggle = async () => {
    await toggleTodo(todo.id);
  };

  const handleDelete = async () => {
    if (window.confirm('このTODOを削除してもよろしいですか？')) {
      setIsDeleting(true);
      const result = await deleteTodo(todo.id);
      if (!result.success) {
        setIsDeleting(false);
      }
    }
  };

  const dueDateStatus = getDueDateStatus(todo.due_date);

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''} ${isDeleting ? 'deleting' : ''}`}>
      <div className="todo-item-main">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className="todo-checkbox"
        />

        <div className="todo-content">
          <div className="todo-title-row">
            <h4 className="todo-title">{todo.title}</h4>
            <div className="todo-badges">
              <PriorityBadge priority={todo.priority} />
              {todo.category_name && (
                <span
                  className="badge"
                  style={{
                    backgroundColor: todo.category_color + '20',
                    color: todo.category_color,
                    borderColor: todo.category_color
                  }}
                >
                  {todo.category_name}
                </span>
              )}
            </div>
          </div>

          {todo.description && (
            <p className="todo-description">{todo.description}</p>
          )}

          <div className="todo-meta">
            {dueDateStatus && (
              <span
                className={`todo-due-date ${dueDateStatus.status}`}
                style={{ color: dueDateStatus.color }}
              >
                📅 {dueDateStatus.message}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="todo-actions">
        <button
          onClick={() => onEdit(todo)}
          className="btn btn-sm btn-secondary"
          disabled={isDeleting}
        >
          編集
        </button>
        <button
          onClick={handleDelete}
          className="btn btn-sm btn-danger"
          disabled={isDeleting}
        >
          削除
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
