// src/services/apiService.ts
import { getAuthHeader } from './authService';

export const fetchData = async (endpoint: string) => {
    try {
        const response = await fetch(`http://localhost:8080/api${endpoint}`, {
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token');
            window.location.href = '/login';
            throw new Error('Unauthorized');
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
        throw error;
    }
};