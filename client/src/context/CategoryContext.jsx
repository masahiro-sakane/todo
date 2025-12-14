import { createContext, useState, useEffect, useCallback } from 'react';
import { categoriesApi } from '../services/api';

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await categoriesApi.getAll();
      setCategories(response.data.data);
    } catch (err) {
      setError(err.response?.data?.error || '通信エラーが発生しました');
      console.error('Failed to fetch categories:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const addCategory = async (categoryData) => {
    try {
      const response = await categoriesApi.create(categoryData);
      setCategories([...categories, response.data.data]);
      return { success: true, data: response.data.data };
    } catch (err) {
      const errorMessage = err.response?.data?.error || '通信エラーが発生しました';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const updateCategory = async (id, categoryData) => {
    try {
      const response = await categoriesApi.update(id, categoryData);
      setCategories(categories.map(cat =>
        cat.id === id ? response.data.data : cat
      ));
      return { success: true, data: response.data.data };
    } catch (err) {
      const errorMessage = err.response?.data?.error || '通信エラーが発生しました';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const deleteCategory = async (id) => {
    try {
      await categoriesApi.delete(id);
      setCategories(categories.filter(cat => cat.id !== id));
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.error || '通信エラーが発生しました';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const value = {
    categories,
    loading,
    error,
    fetchCategories,
    addCategory,
    updateCategory,
    deleteCategory
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};
