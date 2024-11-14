// axiosInstance.js
import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000', // Set your base URL here
  withCredentials: true, // Allows cookies to be sent with cross-site requests
});

// Request interceptor to add authentication token from cookies (if required)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token'); // Assumes token is stored in a cookie named 'token'
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling common errors or logging
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
