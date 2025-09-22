import { apiGet, apiPost, apiPut, apiDelete } from "./apiService";
import type {Haber, HaberCategory} from "../types/haberler.ts";

// Kategorileri getir
export const getAllHaberCategories = async (): Promise<HaberCategory[]> =>
    apiGet<HaberCategory[]>("/api/haberler/category/list");

//Tüm haberler listesi
export const getAllHaber = async (): Promise<Haber[]> =>
    apiGet<Haber[]>("/api/haberler/list");

// Seçili kategori + haberler
export const getHaberCategoryById = async (id: number): Promise<HaberCategory> =>
    apiGet<HaberCategory>(`/api/haberler/category/find/${id}`);

// Tek yayin (gerekirse)
export const getHaberById = async (id: number): Promise<Haber> =>
    apiGet<Haber>(`/api/haberler/find/${id}`);


// CREATE
export const createHaber = async (payload: {
    haberBaslik: string;
    haberTarih: string;
    haberAciklama: string;
    haberResim1: string;
    haberResim2: string;
    categoryId: number;
}): Promise<Haber> => apiPost<Haber>("/api/haberler/create", payload);



// UPDATE
export const updateHaber = async (
    id: number,
    payload: {
        haberBaslik: string;
        haberTarih: string;
        haberAciklama: string;
        haberResim1: string;
        haberResim2: string;
        categoryId: number;
    }
): Promise<Haber> => apiPut<Haber>(`/api/haberler/update/${id}`, payload);



// DELETE
export const deleteHaber = async (id: number): Promise<void> =>
    apiDelete<void>(`/api/haberler/delete/${id}`);

