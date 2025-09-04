import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../services/userService';

interface Permission {
    [area: string]: {
        [action: string]: boolean;
    };
}

interface AuthState {
    user: User | null;
    permissions: Permission | null;
    token: string | null;
    isAuthenticated: boolean;

    // Actions
    login: (userData: any, token: string) => void; // Changed signature to match actual usage
    logout: () => void;
    hasPermission: (area: string, action: string) => boolean;
    updatePermissions: (permissions: Permission) => void;
    setToken: (token: string) => void;
    updateUser: (userData: any) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            permissions: null,
            token: null,
            isAuthenticated: false,

            login: (userData: any, token: string) => {
                console.log('Login called with userData:', userData);
                set({
                    user: userData,
                    token: token,
                    isAuthenticated: true,
                    permissions: userData.permissions || {
                        'kullanıcılar': {
                            'goruntuleme': true,
                            'duzenleme': true,
                            'ekleme': true
                        }
                    }
                });
                //console.log('Store state after set:', get());
            },

            hasPermission: (area: string, action: string): boolean => {
                const { permissions } = get();
                //console.log('Checking permission:', { area, action, permissions });
                return permissions?.[area]?.[action] === true;
            },

            logout: () => {
                set({
                    user: null,
                    permissions: null,
                    token: null,
                    isAuthenticated: false,
                });
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            },


            updatePermissions: (permissions: Permission) => {
                set({ permissions });
            },

            setToken: (token: string) => {
                set({ token });
            },

            updateUser: (userData: any) => {
                const currentState = get();
                set({
                    user: { ...currentState.user, ...userData }
                });
            },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                permissions: state.permissions,
                token: state.token,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);