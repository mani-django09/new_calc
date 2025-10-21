import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Handle the response format { success: true, data: {...} }
    if (response.data && response.data.success) {
      return response.data.data;
    }
    return response.data;
  },
  (error) => {
    const errorMessage = 
      error.response?.data?.error || 
      error.response?.data?.message ||
      error.message || 
      'Something went wrong';
    return Promise.reject(new Error(errorMessage));
  }
);

export const calculatorAPI = {
  calculate: async (calculatorName, data) => {
    return await apiClient.post(`/api/${calculatorName}`, data);
  },
  
  getMetadata: async (calculatorName) => {
    return await apiClient.get(`/api/metadata/${calculatorName}`);
  },
};

export default apiClient;