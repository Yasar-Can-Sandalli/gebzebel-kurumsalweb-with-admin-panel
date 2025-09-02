// src/services/authService.ts
import { useAuthStore } from '../store/authStore'; // <-- IMPORT THE STORE

const API_URL = 'http://localhost:8080/api/auth';
// authService.tsx
export const login = async (username: string, password: string) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Full login response:', data);

        if (data.status === 'success' && data.data?.token) {
            // Store token and user info
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('user', JSON.stringify({
                username: data.data.username
            }));

            // Update auth store with all data including permissions
            const userData = {
                username: data.data.username,
                permissions: data.data.permissions // Make sure this comes from backend

            };

            // Call store login with user data and permissions
            await useAuthStore.getState().login(userData, data.data.token);

            console.log('Permissions after login:', userData.permissions);
            console.log('Store state after login:', useAuthStore.getState());

            return true;
        }

        return false;
    } catch (error) {
        console.error('Login error:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        useAuthStore.getState().logout();
        throw error;
    }
};

// logout now just needs to call the store's logout
export const logout = (navigate?: (path: string) => void) => {
    const storeLogout = useAuthStore.getState().logout;
    storeLogout();
    console.log('User logged out successfully via authService');
    // Navigation can be handled here or preferably in the UI/listener
    if (navigate) {
        navigate('/login');
    }
};

// isAuthenticated should now primarily use the store
export const isAuthenticated = () => {
    // Check the store first, as it reflects if full user details (inc. perms) loaded
    const isAuthInStore = useAuthStore.getState().isAuthenticated;
    // As a fallback (e.g., before store rehydration), check token.
    // But ideally, rely on the store's 'isAuthenticated'.
    return isAuthInStore || localStorage.getItem('token') !== null;
};

// setupAuthListener can remain similar, but ensure it calls the service's logout
export const setupAuthListener = (navigate: (path: string) => void) => {
    const handleStorage = (event: StorageEvent) => {
        if (event.key === 'token' && !event.newValue) {
            console.log("Storage listener detected logout.");
            logout(navigate); // Call our service logout
        }
    };

    window.addEventListener('storage', handleStorage);

    // Consider if you really need setInterval. If so, make sure it uses
    // the store-aware isAuthenticated.
    const intervalId = setInterval(() => {
        if (!isAuthenticated()) { // Use our updated isAuthenticated
            console.log("Interval check detected logout.");
            logout(navigate);
        }
    }, 300000); // 5 minutes

    // Return cleanup function
    return () => {
        window.removeEventListener('storage', handleStorage);
        clearInterval(intervalId);
    };
};

// getAuthHeader remains the same (uses localStorage)
export const getAuthHeader = () => {
    const token = localStorage.getItem('token'); // Or use useAuthStore.getState().token;
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};


// You can now also use the store's hasPermission directly in components
// OR create a wrapper here if needed, but it's often cleaner via the hook.
export const hasPermission = (area: string, action: string) => {
    return useAuthStore.getState().hasPermission(area, action);
}