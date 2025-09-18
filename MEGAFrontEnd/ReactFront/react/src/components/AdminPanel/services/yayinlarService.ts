import { apiGet, apiPost, apiPut, apiDelete } from "./apiService";
import type { Yayin, YayinCategory } from "../types/yayinlar";

// Kategorileri getir

export const getAllYayinCategories = async (): Promise<YayinCategory[]> =>
    apiGet<YayinCategory[]>("/api/yayinlar/category/list");


export const getAllYayin = async (): Promise<Yayin[]> =>
    apiGet<Yayin[]>("/api/yayinlar/list");


// Seçili kategori + yayinlar
export const getYayinCategoryById = async (id: number): Promise<YayinCategory> =>
    apiGet<YayinCategory>(`/api/yayinlar/category/find/${id}`);

// Tek yayin (gerekirse)
export const getYayinById = async (id: number): Promise<Yayin> =>
    apiGet<Yayin>(`/api/yayinlar/find/${id}`);

// CREATE
export const createYayin = async (payload: {
    yayinBaslik: string;
    yayinUrl: string;
    description: string;
    categoryId: number;
}): Promise<Yayin> => apiPost<Yayin>("/api/yayinlar/create", payload);

// UPDATE
export const updateYayin = async (
    id: number,
    payload: {
        yayinBaslik: string;
        yayinUrl: string;
        description: string;
        categoryId: number;
    }
): Promise<Yayin> => apiPut<Yayin>(`/api/yayinlar/update/${id}`, payload);

// DELETE
export const deleteYayin = async (id: number): Promise<void> =>
    apiDelete<void>(`/api/yayinlar/delete/${id}`);

// PDF upload (multipart)
export const uploadPdf = async (file: File): Promise<{ url: string }> => {
    const fd = new FormData();
    fd.append("file", file);
    // NOT: FormData gönderirken Content-Type'ı ELLE set etme.
    return apiPost<{ url: string }>("/api/files/upload", fd);
};
