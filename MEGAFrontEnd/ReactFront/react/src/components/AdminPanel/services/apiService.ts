// apiService.js - Create this file for centralized API calls
import axios from 'axios';

// Create axios instance
const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
        withCredentials: true, // If your backend uses sessions/cookies

    },
});

// Function to set up the request interceptor with the auth store
export const setupApiInterceptors = (getToken) => {
    // Remove any existing interceptors to avoid duplicates
    apiClient.interceptors.request.eject(0);

    // Add request interceptor to include JWT token
    apiClient.interceptors.request.use(
        (config) => {
            const token = getToken();
            console.log('Token being sent:', token); // Debug log

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
};

// Add response interceptor for handling auth errors
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid - redirect to login
            console.log('Unauthorized - redirecting to login');
            // You might want to call logout here
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default apiClient;