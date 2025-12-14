import { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { todosApi } from '../services/api';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    completed: null,
    priority: null,
    category_id: null
  });
  const [sortBy, setSortBy] = useState('created_at');

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await todosApi.getAll(filters);
      setTodos(response.data.data);
    } catch (err) {
      setError(err.response?.data?.error || '通信エラーが発生しました');
      console.error('Failed to fetch todos:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = async (todoData) => {
    try {
      const response = await todosApi.create(todoData);
      setTodos([response.data.data, ...todos]);
      return { success: true, data: response.data.data };
    } catch (err) {
      const errorMessage = err.response?.data?.error || '通信エラーが発生しました';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const updateTodo = async (id, todoData) => {
    try {
      const response = await todosApi.update(id, todoData);
      setTodos(todos.map(todo =>
        todo.id === id ? response.data.data : todo
      ));
      return { success: true, data: response.data.data };
    } catch (err) {
      const errorMessage = err.response?.data?.error || '通信エラーが発生しました';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const toggleTodo = async (id) => {
    try {
      const response = await todosApi.toggle(id);
      setTodos(todos.map(todo =>
        todo.id === id ? response.data.data : todo
      ));
      return { success: true, data: response.data.data };
    } catch (err) {
      const errorMessage = err.response?.data?.error || '通信エラーが発生しました';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const deleteTodo = async (id) => {
    try {
      await todosApi.delete(id);
      setTodos(todos.filter(todo => todo.id !== id));
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.error || '通信エラーが発生しました';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const sortedTodos = useMemo(() => {
    const sorted = [...todos];
    switch (sortBy) {
      case 'priority':
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        sorted.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
        break;
      case 'due_date':
        sorted.sort((a, b) => {
          if (!a.due_date) return 1;
          if (!b.due_date) return -1;
          return new Date(a.due_date) - new Date(b.due_date);
        });
        break;
      case 'created_at':
      default:
        break;
    }
    return sorted;
  }, [todos, sortBy]);

  const value = {
    todos: sortedTodos,
    loading,
    error,
    filters,
    sortBy,
    setFilters,
    setSortBy,
    fetchTodos,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};
