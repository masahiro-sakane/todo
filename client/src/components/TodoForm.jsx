import { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import { useCategories } from '../hooks/useCategories';
import { validateTodo } from '../utils/validators';
import { formatDateInput } from '../utils/dateUtils';
import './TodoForm.css';

const TodoForm = ({ editingTodo, onCancel }) => {
  const { addTodo, updateTodo } = useTodos();
  const { categories } = useCategories();

  const [formData, setFormData] = useState({
    title: editingTodo?.title || '',
    description: editingTodo?.description || '',
    priority: editingTodo?.priority || 'medium',
    due_date: editingTodo?.due_date ? formatDateInput(editingTodo.due_date) : '',
    category_id: editingTodo?.category_id || ''
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateTodo(formData);
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }

    const todoData = {
      ...formData,
      category_id: formData.category_id ? parseInt(formData.category_id) : null
    };

    let result;
    if (editingTodo) {
      result = await updateTodo(editingTodo.id, todoData);
    } else {
      result = await addTodo(todoData);
    }

    if (result.success) {
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        due_date: '',
        category_id: ''
      });
      setErrors({});
      if (onCancel) onCancel();
    } else {
      setErrors({ submit: result.error });
    }
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      due_date: '',
      category_id: ''
    });
    setErrors({});
    if (onCancel) onCancel();
  };

  return (
    <div className="todo-form card">
      <h3>{editingTodo ? 'TODO編集' : '新しいTODO'}</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">タイトル *</label>
          <input
            type="text"
            id="title"
            placeholder="TODOのタイトルを入力..."
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className={errors.title ? 'error' : ''}
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">説明</label>
          <textarea
            id="description"
            placeholder="詳細な説明（任意）"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows="3"
            className={errors.description ? 'error' : ''}
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="priority">優先度</label>
            <select
              id="priority"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            >
              <option value="low">低</option>
              <option value="medium">中</option>
              <option value="high">高</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="due_date">期限日</label>
            <input
              type="date"
              id="due_date"
              value={formData.due_date}
              onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
              className={errors.due_date ? 'error' : ''}
            />
            {errors.due_date && <span className="error-message">{errors.due_date}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="category_id">カテゴリ</label>
            <select
              id="category_id"
              value={formData.category_id}
              onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
            >
              <option value="">なし</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {errors.submit && <div className="error-message">{errors.submit}</div>}

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingTodo ? '更新' : '追加'}
          </button>
          {editingTodo && (
            <button type="button" onClick={handleCancel} className="btn btn-secondary">
              キャンセル
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
