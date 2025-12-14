import { useFilters } from '../hooks/useFilters';
import { useCategories } from '../hooks/useCategories';
import './TodoFilters.css';

const TodoFilters = () => {
  const { filters, sortBy, updateFilter, setSortBy, clearFilters, hasActiveFilters } = useFilters();
  const { categories } = useCategories();

  return (
    <div className="todo-filters card">
      <div className="filters-header">
        <h3>フィルター・ソート</h3>
        {hasActiveFilters && (
          <button onClick={clearFilters} className="btn btn-secondary btn-sm">
            クリア
          </button>
        )}
      </div>

      <div className="filters-grid">
        <div className="filter-group">
          <label>完了状態</label>
          <select
            value={filters.completed === null ? 'all' : filters.completed ? 'true' : 'false'}
            onChange={(e) => {
              const value = e.target.value;
              updateFilter('completed', value === 'all' ? null : value === 'true');
            }}
          >
            <option value="all">すべて</option>
            <option value="false">未完了</option>
            <option value="true">完了</option>
          </select>
        </div>

        <div className="filter-group">
          <label>優先度</label>
          <select
            value={filters.priority || 'all'}
            onChange={(e) => {
              const value = e.target.value;
              updateFilter('priority', value === 'all' ? null : value);
            }}
          >
            <option value="all">すべて</option>
            <option value="high">高</option>
            <option value="medium">中</option>
            <option value="low">低</option>
          </select>
        </div>

        <div className="filter-group">
          <label>カテゴリ</label>
          <select
            value={filters.category_id || 'all'}
            onChange={(e) => {
              const value = e.target.value;
              updateFilter('category_id', value === 'all' ? null : parseInt(value));
            }}
          >
            <option value="all">すべて</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>並び替え</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="created_at">作成日時</option>
            <option value="priority">優先度</option>
            <option value="due_date">期限日</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TodoFilters;
