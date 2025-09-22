// src/services/raporlarService.ts
import { apiGet, apiPost, apiPut, apiDelete } from "./apiService";
import type { Rapor, RaporCategory } from "../types/raporlar.ts";

/* -----------------------------------------------------------
   Helpers: id normalizasyonu + tarih formatı
----------------------------------------------------------- */
const safeNum = (v: unknown, name: string): number => {
    const n = typeof v === "string" ? Number(v) : (v as number);
    if (!Number.isFinite(n)) {
        throw new Error(`[raporlarService] Geçersiz ${name}: ${String(v)}`);
    }
    return n;
};

const toDateYYYYMMDD = (d?: string | null): string | undefined => {
    if (!d) return undefined;                 // hiç yollama (backend optional ise)
    // "YYYY-MM-DD" veya ISO geldiyse ilk 10
    if (/^\d{4}-\d{2}-\d{2}/.test(d)) return d.slice(0, 10);
    const dt = new Date(d);
    if (isNaN(dt.getTime())) return undefined;
    return dt.toISOString().slice(0, 10);
};

/* -----------------------------------------------------------
   Categories
----------------------------------------------------------- */

// Kategorileri getir
export const getAllRaporCategories = async (): Promise<RaporCategory[]> =>
    apiGet<RaporCategory[]>("/api/raporlar/category/list");

// Seçili kategori + raporlar
export const getRaporCategoryById = async (id: number | string): Promise<RaporCategory> => {
    const cid = safeNum(id, "categoryId");
    return apiGet<RaporCategory>(`/api/raporlar/category/find/${cid}`);
};

/* -----------------------------------------------------------
   Rapor CRUD
----------------------------------------------------------- */

// Tek rapor (gerekirse)
export const getRaporById = async (id: number | string): Promise<Rapor> => {
    const rid = safeNum(id, "raporId");
    return apiGet<Rapor>(`/api/raporlar/find/${rid}`);
};

// CREATE
export const createRapor = async (payload: {
    raporBaslik: string;
    raporUrl: string;
    categoryId: number | string;   // dışarıdan string de gelebilir
    raporTarihi?: string | null;   // "YYYY-MM-DD" | ISO | null | undefined
    raporDurum?: boolean;
}): Promise<Rapor> => {
    const body = {
        raporBaslik: (payload.raporBaslik ?? "").trim(),
        raporUrl: (payload.raporUrl ?? "").trim(),
        categoryId: safeNum(payload.categoryId, "categoryId"),
        raporTarihi: toDateYYYYMMDD(payload.raporTarihi ?? undefined),
        raporDurum: !!payload.raporDurum,
    };
    return apiPost<Rapor>("/api/raporlar/create", body);
};

// UPDATE
export const updateRapor = async (
    id: number | string,
    payload: {
        raporBaslik: string;
        raporUrl: string;
        categoryId: number | string;
        raporTarihi?: string | null; // "YYYY-MM-DD" | ISO | null | undefined
        raporDurum?: boolean;
    }
): Promise<Rapor> => {
    const rid = safeNum(id, "raporId");
    const body = {
        raporBaslik: (payload.raporBaslik ?? "").trim(),
        raporUrl: (payload.raporUrl ?? "").trim(),
        categoryId: safeNum(payload.categoryId, "categoryId"),
        raporTarihi: toDateYYYYMMDD(payload.raporTarihi ?? undefined),
        raporDurum: !!payload.raporDurum,
    };
    return apiPut<Rapor>(`/api/raporlar/update/${rid}`, body);
};

// DELETE
export const deleteRapor = async (id: number | string): Promise<void> => {
    const rid = safeNum(id, "raporId");
    return apiDelete<void>(`/api/raporlar/delete/${rid}`);
};

// PDF upload (multipart)
export const uploadPdf = async (file: File): Promise<{ url: string }> => {
    const fd = new FormData();
    fd.append("file", file);
    // NOT: FormData gönderirken Content-Type'ı elle set etme.
    return apiPost<{ url: string }>("/api/files/upload", fd);
};
