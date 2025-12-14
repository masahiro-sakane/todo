import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      console.error('Network Error:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const todosApi = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.completed !== undefined) params.append('completed', filters.completed);
    if (filters.priority) params.append('priority', filters.priority);
    if (filters.category_id) params.append('category_id', filters.category_id);

    return api.get(`/todos?${params.toString()}`);
  },

  getById: (id) => api.get(`/todos/${id}`),

  create: (todoData) => api.post('/todos', todoData),

  update: (id, todoData) => api.put(`/todos/${id}`, todoData),

  toggle: (id) => api.patch(`/todos/${id}/toggle`),

  delete: (id) => api.delete(`/todos/${id}`)
};

export const categoriesApi = {
  getAll: () => api.get('/categories'),

  getById: (id) => api.get(`/categories/${id}`),

  create: (categoryData) => api.post('/categories', categoryData),

  update: (id, categoryData) => api.put(`/categories/${id}`, categoryData),

  delete: (id) => api.delete(`/categories/${id}`)
};

export default api;
