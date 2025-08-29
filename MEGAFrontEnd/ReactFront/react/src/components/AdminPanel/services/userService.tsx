// src/services/userService.tsx

import api from "../../axiosConfig.ts"; // Import the configured Axios instance

const API_BASE_URL = "http://localhost:8080/api/users";

export interface User {
    id: number;
    tcno: string;
    isim: string;
    status: string;
    yetkilerJson: string;
    password?: string; // Sadece backend'e gönderirken (oluşturma/şifre güncelleme)
}

// 1. Tüm kullanıcıları getirme
export async function fetchUsers(): Promise<User[]> {
    try {
        const response = await api.get<User[]>(API_BASE_URL, {
            withCredentials: true // Eğer backend session/cookie tabanlı auth kullanıyorsa
        });
        return response.data;
    } catch (error: any) {
        console.error("Error fetching users:", error.response?.data || error.message);
        throw new Error(`Failed to fetch users: ${error.response?.status || error.message}`);
    }
}

// 2. ID ile tek kullanıcı getirme
export async function fetchUserById(id: number): Promise<User> {
    try {
        const response = await api.get<User>(`${API_BASE_URL}/${id}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error: any) {
        console.error(`Error fetching user ${id}:`, error.response?.data || error.message);
        throw new Error(`Failed to fetch user ${id}: ${error.response?.status || error.message}`);
    }
}

// 3. Yeni kullanıcı oluşturma
export type CreateUserPayload = {
    tcno: string;
    isim?: string;
    password: string;
    yetkilerJson: string;
    status?: string;
};

export async function createUser(userData: CreateUserPayload): Promise<User> {
    try {
        const response = await api.post<User>(API_BASE_URL, userData, {
            withCredentials: true
        });
        return response.data;
    } catch (error: any) {
        if (error.response?.status === 409) {
            throw new Error("Kullanıcı zaten mevcut (TC No kullanımda)");
        }
        console.error("Error creating user:", error.response?.data || error.message);
        throw new Error(`Failed to create user: ${error.response?.status || error.message}`);
    }
}

// 4. Kullanıcı güncelleme
export type UpdateUserPayload = {
    isim?: string;
    status?: string;
};

export async function updateUser(id: number, userData: UpdateUserPayload): Promise<User> {
    try {
        const response = await api.put<User>(`${API_BASE_URL}/${id}`, userData, {
            withCredentials: true
        });
        return response.data;
    } catch (error: any) {
        console.error(`Error updating user ${id}:`, error.response?.data || error.message);
        throw new Error(`Failed to update user ${id}: ${error.response?.status || error.message}`);
    }
}

// 5. Kullanıcı silme
export async function deleteUser(id: number): Promise<void> {
    try {
        await api.delete(`${API_BASE_URL}/${id}`, {
            withCredentials: true
        });
    } catch (error: any) {
        console.error(`Error deleting user ${id}:`, error.response?.data || error.message);
        throw new Error(`Failed to delete user ${id}: ${error.response?.status || error.message}`);
    }
}