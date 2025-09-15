import { useState, useEffect } from 'react';
import { getCurrentUser } from '../services/authService';
import { useAuthStore } from '../store/authStore';

interface CurrentUser {
    id: number;
    tcno: string;
    isim: string;
    status: string;
    profilFoto: string;
    permissions: any;
}

export const useCurrentUser = () => {
    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { isAuthenticated } = useAuthStore();

    const fetchCurrentUser = async () => {
        if (!isAuthenticated) {
            setCurrentUser(null);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const userData = await getCurrentUser();
            setCurrentUser(userData);
        } catch (err: any) {
            console.error('Error fetching current user:', err);
            setError(err.message || 'Kullanıcı bilgileri alınamadı');
            setCurrentUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCurrentUser();
    }, [isAuthenticated]);

    return {
        currentUser,
        loading,
        error,
        refetch: fetchCurrentUser
    };
};