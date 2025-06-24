import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

let csrfToken: string | null = null;

export const getCsrfToken = async (forceRefresh = false) => {
  if (!csrfToken || forceRefresh) {
    try {
      await api.get('/csrf/');
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];
      csrfToken = token || null;
    } catch (error) {
      // CSRF token fetch failed, continue without token
    }
  }
  return csrfToken;
};

export const refreshCsrfToken = () => {
  csrfToken = null;
  return getCsrfToken(true);
};

api.interceptors.request.use(async (config) => {
  if (['post', 'put', 'patch', 'delete'].includes(config.method || '')) {
    const token = await getCsrfToken();
    if (token) {
      config.headers['X-CSRFToken'] = token;
    }
  }
  return config;
});

// Add response interceptor to handle CSRF token refresh on 403 errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Refresh CSRF token and retry the request
      await refreshCsrfToken();
      const newToken = await getCsrfToken();
      if (newToken) {
        originalRequest.headers['X-CSRFToken'] = newToken;
      }
      
      return api(originalRequest);
    }
    
    return Promise.reject(error);
  }
);

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  due_date: string | null;
  category: string;
  tags: string;
  created_at: string;
  updated_at: string;
  user: User;
}

export const authApi = {
  login: (username: string, password: string) =>
    api.post('/login/', { username, password }),
  
  logout: () => api.post('/logout/'),
  
  getUserInfo: () => api.get<User>('/user/'),
};

export const todoApi = {
  getTodos: () => api.get<{ results: Todo[] }>('/todos/'),
  
  getTodo: (id: number) => api.get<Todo>(`/todos/${id}/`),
  
  createTodo: (todo: Partial<Todo>) => api.post<Todo>('/todos/', todo),
  
  updateTodo: (id: number, todo: Partial<Todo>) => api.patch<Todo>(`/todos/${id}/`, todo),
  
  deleteTodo: (id: number) => api.delete(`/todos/${id}/`),
};

export default api;