import { useMemo } from 'react';
import { useTodos } from './useTodos';

export const useFilters = () => {
  const { filters, setFilters, sortBy, setSortBy } = useTodos();

  const updateFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      completed: null,
      priority: null,
      category_id: null
    });
  };

  const hasActiveFilters = useMemo(() => {
    return filters.completed !== null ||
           filters.priority !== null ||
           filters.category_id !== null;
  }, [filters]);

  return {
    filters,
    sortBy,
    updateFilter,
    setSortBy,
    clearFilters,
    hasActiveFilters
  };
};
