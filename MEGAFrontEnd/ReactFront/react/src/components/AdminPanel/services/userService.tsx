// src/sayfalar/services/userService.tsx
import api from "../../axiosConfig";

export type User = {
    id: number;
    tcno: string;
    isim?: string;
    status?: "Aktif" | "Pasif" | "Beklemede" | string;
    yetkilerJson?: string;
};

const API = "/api/users";

export async function fetchUsers(): Promise<User[]> {
    const { data } = await api.get<User[]>(API);
    return data ?? [];
}

export async function getUserById(id: number | string): Promise<User> {
    const { data } = await api.get<User>(`${API}/${id}`);
    return data;
}

export async function createUser(payload: {
    tcno: string;
    isim: string;
    password: string;
    status: string;
    yetkilerJson: string;
}): Promise<User> {
    const { data } = await api.post<User>(API, payload, {
        headers: { "Content-Type": "application/json" },
    });
    return data;
}

export async function updateUser(id: number, payload: Partial<User>): Promise<User> {
    const { data } = await api.put<User>(`${API}/${id}`, payload, {
        headers: { "Content-Type": "application/json" },
    });
    return data;
}

export async function deleteUser(id: number): Promise<void> {
    await api.delete(`${API}/${id}`);
}
