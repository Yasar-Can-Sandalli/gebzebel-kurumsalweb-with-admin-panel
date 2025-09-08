import { apiGet, apiPost, apiPut, apiDelete } from "./apiService";
import type { Rapor, RaporCategory } from "../../../types/raporlar";

// Kategorileri getir
export const getAllRaporCategories = async (): Promise<RaporCategory[]> =>
    apiGet<RaporCategory[]>("/api/raporlar/category/list");

// Seçili kategori + raporlar
export const getRaporCategoryById = async (id: number): Promise<RaporCategory> =>
    apiGet<RaporCategory>(`/api/raporlar/category/find/${id}`);

// Tek rapor (gerekirse)
export const getRaporById = async (id: number): Promise<Rapor> =>
    apiGet<Rapor>(`/api/raporlar/find/${id}`);

// CREATE
export const createRapor = async (payload: {
    raporBaslik: string;
    raporUrl: string;
    categoryId: number;
    raporTarihi?: string; // ISO
    raporDurum?: boolean;
}): Promise<Rapor> => apiPost<Rapor>("/api/raporlar/create", payload);

// UPDATE
export const updateRapor = async (
    id: number,
    payload: {
        raporBaslik: string;
        raporUrl: string;
        categoryId: number;
        raporTarihi?: string; // ISO
        raporDurum?: boolean;
    }
): Promise<Rapor> => apiPut<Rapor>(`/api/raporlar/update/${id}`, payload);

// DELETE
export const deleteRapor = async (id: number): Promise<void> =>
    apiDelete<void>(`/api/raporlar/delete/${id}`);

// PDF upload (multipart)
export const uploadPdf = async (file: File): Promise<{ url: string }> => {
    const fd = new FormData();
    fd.append("file", file);
    // NOT: FormData gönderirken Content-Type'ı ELLE set etme.
    return apiPost<{ url: string }>("/api/files/upload", fd);
};
