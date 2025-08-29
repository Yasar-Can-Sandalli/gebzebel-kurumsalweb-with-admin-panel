// Tek giriş noktası: Kurumsal sekmeleri için liste/get/create/update/delete/archivle
import { apiGet, apiPost, apiPut, apiDelete } from "./apiService.tsx";

/** UI tab anahtarları */
export type KurumsalTab = "yonetim" | "vizyon" | "raporlar" | "komisyonlar";

/** Listeleme parametreleri (sunucuya querystring olarak gönderiyoruz) */
export interface ListParams {
    q?: string;                 // arama
    status?: "Yayınlandı" | "Taslak" | "Arşivlendi" | ""; // durum filtresi
    page?: number;              // 1-based
    size?: number;              // sayfa boyutu
    sort?: string;              // ör: "updatedAt,desc"
}

/** Paged sonuç standardı */
export interface PageResult<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    page: number;     // 1-based
    size: number;
}

/** UI tablosunun satırı */
export interface KurumsalRow {
    id: number;
    title: string;
    slug?: string;
    category: string;
    status: "Yayınlandı" | "Taslak" | "Arşivlendi";
    updatedAt: string;         // ISO
    author?: string;
    tableName?: string;        // EditPage rotası için
}

/** Kurumsal servis – tüm sekmeler için tek gateway */
export const kurumsalService = {
    /**
     * Sunucudan dinamik liste çeker.
     * Backend tarafında aşağıdaki endpoint’ler varsayılıyor:
     *  - GET /api/kurumsal/yonetim-semasi
     *  - GET /api/kurumsal/baskan-misyon-vizyon-ilke
     *  - GET /api/kurumsal/raporlar
     *  - GET /api/kurumsal/komisyonlar
     * Hepsi ortak PageResult<KurumsalRow> döner.
     */
    async list(tab: KurumsalTab, params: ListParams): Promise<PageResult<KurumsalRow>> {
        const base = {
            yonetim:    "/api/kurumsal/yonetim-semasi",
            vizyon:     "/api/kurumsal/baskan-misyon-vizyon-ilke",
            raporlar:   "/api/kurumsal/raporlar",
            komisyonlar:"/api/kurumsal/komisyonlar",
        }[tab];

        // örnek: /api/... ?q=..&status=..&page=1&size=20&sort=updatedAt,desc
        const qs = new URLSearchParams();
        if (params.q) qs.set("q", params.q);
        if (params.status) qs.set("status", params.status);
        qs.set("page", String(params.page ?? 1));
        qs.set("size", String(params.size ?? 20));
        qs.set("sort", params.sort ?? "updatedAt,desc");

        const url = `${base}?${qs.toString()}`;
        // apiGet tipi: <T>(url:string)=>Promise<T>
        return apiGet<PageResult<KurumsalRow>>(url);
    },

    /** Silme – tab’a göre doğru endpoint’e gider */
    async remove(tab: KurumsalTab, id: number): Promise<void> {
        const base = {
            yonetim:    "/api/kurumsal/yonetim-semasi",
            vizyon:     "/api/kurumsal/baskan-misyon-vizyon-ilke",
            raporlar:   "/api/kurumsal/raporlar",
            komisyonlar:"/api/kurumsal/komisyonlar",
        }[tab];
        await apiDelete(`${base}/${id}`);
    },

    /** Arşivle/geri-al – PATCH/PUT tercihine göre backend ile netleştirilebilir */
    async archive(tab: KurumsalTab, id: number, archived: boolean): Promise<void> {
        const base = {
            yonetim:    "/api/kurumsal/yonetim-semasi",
            vizyon:     "/api/kurumsal/baskan-misyon-vizyon-ilke",
            raporlar:   "/api/kurumsal/raporlar",
            komisyonlar:"/api/kurumsal/komisyonlar",
        }[tab];
        await apiPut(`${base}/${id}/archive`, { archived });
    },

    /** Oluşturma – form payload’ı backend şemasına göre gönderilecek */
    async create<TPayload extends Record<string, any>>(tab: KurumsalTab, payload: TPayload): Promise<number> {
        const base = {
            yonetim:    "/api/kurumsal/yonetim-semasi",
            vizyon:     "/api/kurumsal/baskan-misyon-vizyon-ilke",
            raporlar:   "/api/kurumsal/raporlar",
            komisyonlar:"/api/kurumsal/komisyonlar",
        }[tab];
        const res = await apiPost<{ id: number }>(base, payload);
        return res.id;
    },
};
