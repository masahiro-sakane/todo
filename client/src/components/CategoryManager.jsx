import { useState } from 'react';
import { useCategories } from '../hooks/useCategories';
import { validateCategory } from '../utils/validators';
import './CategoryManager.css';

const CategoryManager = () => {
  const { categories, addCategory, updateCategory, deleteCategory, loading } = useCategories();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', color: '#808080' });
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateCategory(formData);
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }

    let result;
    if (editingId) {
      result = await updateCategory(editingId, formData);
    } else {
      result = await addCategory(formData);
    }

    if (result.success) {
      setFormData({ name: '', color: '#808080' });
      setIsAdding(false);
      setEditingId(null);
      setErrors({});
    } else {
      setErrors({ submit: result.error });
    }
  };

  const handleEdit = (category) => {
    setEditingId(category.id);
    setFormData({ name: category.name, color: category.color });
    setIsAdding(true);
    setErrors({});
  };

  const handleCancel = () => {
    setFormData({ name: '', color: '#808080' });
    setIsAdding(false);
    setEditingId(null);
    setErrors({});
  };

  const handleDelete = async (id) => {
    if (window.confirm('このカテゴリを削除してもよろしいですか？関連するTODOはカテゴリなしになります。')) {
      await deleteCategory(id);
    }
  };

  return (
    <div className="category-manager card">
      <div className="category-manager-header">
        <h3>カテゴリ管理</h3>
        {!isAdding && (
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setIsAdding(true)}
          >
            + 追加
          </button>
        )}
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="category-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="カテゴリ名"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <input
              type="color"
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            />
            {errors.color && <span className="error-message">{errors.color}</span>}
          </div>

          {errors.submit && <div className="error-message">{errors.submit}</div>}

          <div className="form-actions">
            <button type="submit" className="btn btn-primary btn-sm">
              {editingId ? '更新' : '追加'}
            </button>
            <button type="button" onClick={handleCancel} className="btn btn-secondary btn-sm">
              キャンセル
            </button>
          </div>
        </form>
      )}

      <div className="category-list">
        {loading ? (
          <div>読み込み中...</div>
        ) : (
          categories.map(category => (
            <div key={category.id} className="category-item">
              <div className="category-info">
                <span
                  className="category-color"
                  style={{ backgroundColor: category.color }}
                />
                <span className="category-name">{category.name}</span>
              </div>
              <div className="category-actions">
                <button
                  onClick={() => handleEdit(category)}
                  className="btn btn-sm btn-secondary"
                >
                  編集
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="btn btn-sm btn-danger"
                >
                  削除
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryManager;
