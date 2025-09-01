// pageService.tsx ve diğerleri
import {apiClient} from "./apiService";
// src/sayfalar/services/pageService.tsx
import { apiGet, apiPut } from "../services/apiService";
// Base API configuration

// Create axios instance with default config


// Request interceptor for adding auth tokens if needed
apiClient.interceptors.request.use(
    (config) => {
        // Add auth token if available
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling common errors
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access
            localStorage.removeItem('auth_token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);
//----------------------- haber için-----------------------


// Types for different entities
export interface BaskanEntity {
    id: number;
    resimUrl1: string;
    imageUrl2: string;
    baslik: string;
    icerik: string;
    kategori: string;
    aktif: boolean;
    olusturmaTarihi: string;
    guncellemeTarihi: string;
    olusturanKullanici: string;
}

export interface YonetimSemasiEntity {
    id: number;
    isimSoyisim: string;
    resimUrl: string;
    soyad: string;
    unvan: string;
    pozisyon: string;
    aktif: boolean;
    olusturmaTarihi: string;
}
// Tek kayıt getir
export async function getYonetimById(id: number | string): Promise<YonetimRow> {
    const res = await apiGet<YonetimRow>(`/api/kurumsal/yonetim/${id}`);
    return res; // data değil
}

// Güncelle
export async function updateYonetim(payload: YonetimRow): Promise<YonetimRow> {
    const res = await apiPut<YonetimRow>(`/api/kurumsal/yonetim/${payload.id}`, payload);
    return res; // yine data değil
}

export interface PageEntity {
    id: number;
    title: string;
    resimUrl?: string;
    resimUrl1?: string;
    imageUrl2?: string;
    slug: string;
    category: string;
    tableName?: string; // Backend'de hangi tabloya ait olduğunu belirtmek için
    delta?: number | null; // Backend'den gelen raw değer (0, 1, 2 veya null)
    status?: 'Yayınlandı' | 'Taslak' | 'Arşivlendi'; // Frontend'de türetilen değer
    createdAt: string;
    updatedAt: string;
    author: string;
    content?: string;
}

// Delta -> Status dönüştürme fonksiyonu
export const convertDeltaToStatus = (delta?: number | null): PageEntity['status'] => {
    if (delta === null || delta === undefined) {
        return 'Taslak'; // Default değer
    }

    switch (delta) {
        case 1:
            return 'Yayınlandı';
        case 2:
            return 'Taslak';
        case 0:
        default:
            return 'Arşivlendi';
    }
};

// Status -> Delta dönüştürme fonksiyonu (backend'e gönderirken)
export const convertStatusToDelta = (status: PageEntity['status']): number => {
    switch (status) {
        case 'Yayınlandı':
            return 1;
        case 'Taslak':
            return 2;
        case 'Arşivlendi':
        default:
            return 0;
    }
};

// Kurumsal/Baskan API calls
export const BaskanAPI = {
    // Get active baskan
    getActiveBaskan: async (): Promise<BaskanEntity[]> => {
        const response = await apiClient.get('/api/kurumsal/baskan/active');
        return response.data;
    },

    // Get active misyon
    getActiveMisyon: async (): Promise<BaskanEntity[]> => {
        const response = await apiClient.get('/api/kurumsal/misyon/active');
        return response.data;
    },

    // Get active vizyon
    getActiveVizyon: async (): Promise<BaskanEntity[]> => {
        const response = await apiClient.get('/api/kurumsal/vizyon/active');
        return response.data;
    },

    // Get active ilkelerimiz
    getActiveIlkelerimiz: async (): Promise<BaskanEntity[]> => {
        const response = await apiClient.get('/api/kurumsal/ilkelerimiz/active');
        return response.data;
    },

    // Get active by kategori
    getActiveByKategori: async (kategori: string): Promise<BaskanEntity[]> => {
        const response = await apiClient.get(`/api/kurumsal/kategori/${kategori}`);
        return response.data;
    },

    // Get active by id and kategori
    getActiveByIdAndKategori: async (kategori: string, id: number): Promise<BaskanEntity> => {
        const response = await apiClient.get(`/api/kurumsal/kategori/${kategori}/${id}`);
        return response.data;
    },
    updateBaskan: async (id: number, data: Partial<BaskanEntity>): Promise<BaskanEntity> => {
        const response = await apiClient.put(`/api/kurumsal/baskan/${id}`, data);
        return response.data;
    },
    // Get all inactive
    getAllInactiveBaskan: async (): Promise<BaskanEntity[]> => {
        const response = await apiClient.get('/api/kurumsal/inactive');
        return response.data;
    },
};

// Yönetim Şeması API calls
export const YonetimSemasiAPI = {
    // (mevcutlar)
    getYonetimSemasi: async (): Promise<{
        baskan: YonetimSemasiEntity[];
        baskanYardimcilari: YonetimSemasiEntity[];
    }> => {
        const res = await apiClient.get('/api/kurumsal/yonetimsemasi');
        return res.data;
    },

    makeInactive: async (id: number): Promise<void> => {
        await apiClient.put(`/api/kurumsal/baskanyardimcilari/${id}`, { delta: 0 });
    },

    getBaskanDanismanlari: async (): Promise<YonetimSemasiEntity[]> => {
        const res = await apiClient.get('/api/kurumsal/baskandanismanlari');
        return res.data;
    },

    /** Silme endpoint’in varsa bunu kullanalım; yoksa catch’te pasif yapıyoruz */
    remove: async (id: number): Promise<void> => {
        await apiClient.delete(`/api/kurumsal/yonetimsemasi/${id}`);
    },
};
export type YonetimRow = {
    id: number;
    isimSoyisim: string;
    resimUrl: string;
    pozisyon: string;
    aktif?: boolean;
};

/** Başkan + Yardımcılar + (opsiyonel) Danışmanlar birlikte döner */
export const fetchYonetimRows = async (): Promise<YonetimRow[]> => {
    const [{baskan, baskanYardimcilari}, danismanlar] = await Promise.all([
        YonetimSemasiAPI.getYonetimSemasi(),
        YonetimSemasiAPI.getBaskanDanismanlari().catch(() => []), // endpoint yoksa sorun çıkarmasın
    ]);

    const mapRow = (x: YonetimSemasiEntity): YonetimRow => ({
        id: x.id,
        isimSoyisim: x.isimSoyisim,
        resimUrl: x.resimUrl,
        pozisyon: x.pozisyon || x.unvan || "",
        aktif: x.aktif,
    });

    return [
        ...baskan.map(mapRow),
        ...baskanYardimcilari.map(mapRow),
        ...danismanlar.map(mapRow),
    ];
};

/*

// Generic Page API calls ÖRNEK API ÇAĞRISI
export const PageAPI = {
    // Get all pages with optional filters
    getAllPages: async (params?: {
        category?: string;
        status?: string;
        search?: string;
        page?: number;
        size?: number;
    }): Promise<{
        content: PageEntity[];
        totalElements: number;
        totalPages: number;
        currentPage: number;
    }> => {
        const response = await apiClient.get('/api/pages', { params });
        return response.data;
    },

    // Get page by id
    getPageById: async (id: number): Promise<PageEntity> => {
        const response = await apiClient.get(`/api/pages/${id}`);
        return response.data;
    },

    // Create new page
    createPage: async (page: Omit<PageEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<PageEntity> => {
        // Status'u delta'ya çevir
        const pageWithDelta = {
            ...page,
            delta: page.status ? convertStatusToDelta(page.status) : 2, // Default: Taslak
        };
        delete pageWithDelta.status; // Backend'e status gönderme

        const response = await apiClient.post('/api/pages', pageWithDelta);
        return response.data;
    },

    // Update page
    updatePage: async (id: number, page: Partial<PageEntity>): Promise<PageEntity> => {
        // Status'u delta'ya çevir
        const pageWithDelta = { ...page };
        if (page.status) {
            pageWithDelta.delta = convertStatusToDelta(page.status);
            delete pageWithDelta.status; // Backend'e status gönderme
        }

        // İçeriği boş string olarak göndermek yerine undefined gönderilirse backend güncellemeyebilir,
        // bu yüzden content alanı her zaman string olmalı
        if (typeof pageWithDelta.content !== 'string') {
            pageWithDelta.content = '';
        }

        const response = await apiClient.put(`/api/pages/${id}`, pageWithDelta);
        return response.data;
    },

    // Delete page
    deletePage: async (id: number): Promise<void> => {
        await apiClient.delete(`/api/pages/${id}`);
    },

    // Bulk delete pages
    deletePages: async (ids: number[]): Promise<void> => {
        await apiClient.delete('/api/pages/bulk', { data: { ids } });
    },

    // Get page categories
    getCategories: async (): Promise<string[]> => {
        const response = await apiClient.get('/api/pages/categories');
        return response.data;
    },
};
*/

// Combined API service for fetching multiple data sources
export const CombinedPageService = {
    // Fetch all page-related data from different controllers
    getAllPageData: async (): Promise<{
        kurumsal: {
            baskan: BaskanEntity[];
            misyon: BaskanEntity[];
            vizyon: BaskanEntity[];
            ilkelerimiz: BaskanEntity[];
        };
        yonetimSemasi: {
            baskan: YonetimSemasiEntity[];
            baskanYardimcilari: YonetimSemasiEntity[];
            danismanlar: YonetimSemasiEntity[];
        };
        pages: PageEntity[];
    }> => {
        try {
            // Fetch data from multiple controllers concurrently
            const [
                baskanData,
                misyonData,
                vizyonData,
                ilkelerimizData,
                yonetimSemasiData,
                danismanlarData,
                // pagesData, // Uncomment when you create the pages endpoint
            ] = await Promise.all([
                BaskanAPI.getActiveBaskan(),
                BaskanAPI.getActiveMisyon(),
                BaskanAPI.getActiveVizyon(),
                BaskanAPI.getActiveIlkelerimiz(),
                YonetimSemasiAPI.getYonetimSemasi(),
                YonetimSemasiAPI.getBaskanDanismanlari(),
                // PageAPI.getAllPages(), // Uncomment when you create the pages endpoint
            ]);

            return {
                kurumsal: {
                    baskan: baskanData,
                    misyon: misyonData,
                    vizyon: vizyonData,
                    ilkelerimiz: ilkelerimizData,
                },
                yonetimSemasi: {
                    baskan: yonetimSemasiData.baskan,
                    baskanYardimcilari: yonetimSemasiData.baskanYardimcilari,
                    danismanlar: danismanlarData,
                },
                pages: [], // Replace with pagesData when available
            };
        } catch (error) {
            console.error('Error fetching combined page data:', error);
            throw error;
        }
    },

    // Convert different entity types to unified Page format
    convertToPageFormat: (
        kurumsal: BaskanEntity[],
        yonetimSemasi: YonetimSemasiEntity[]
    ): PageEntity[] => {
        const pages: PageEntity[] = [];

        // Kurumsal entity'leri dönüştür
        kurumsal.forEach((item) => {
            // aktif boolean'ını delta'ya çevir
            const delta = item.aktif ? 1 : 0;

            pages.push({
                id: item.id,
                title: item.baslik,
                resimUrl1: item.resimUrl1,
                imageUrl2: item.imageUrl2,
                slug: `kurumsal-${item.kategori}-${item.id}`,
                category: 'Kurumsal',
                tableName: 'KURUMSAL_BASKAN_MISYON_VIZYON_ILKELERIMIZ', // Add this line
                delta: delta,
                status: convertDeltaToStatus(delta),
                createdAt: item.olusturmaTarihi,
                updatedAt: item.guncellemeTarihi,
                author: item.olusturanKullanici,
                content: item.icerik,
            });
        });

        // Yönetim şeması entity'leri dönüştür
        yonetimSemasi.forEach((item) => {
            // aktif boolean'ını delta'ya çevir
            const delta = item.aktif ? 1 : 0;

            pages.push({
                id: item.id + 10000, // ID çakışmasını önlemek için offset
                title: `${item.isimSoyisim} - ${item.pozisyon}`,
                slug: `yonetim-${item.pozisyon}-${item.id}`,
                resimUrl: item.resimUrl,
                category: 'Yönetim',
                tableName: 'KURUMSAL_YONETIM_SEMASI', // Add this line
                delta: delta,
                status: convertDeltaToStatus(delta),
                createdAt: item.olusturmaTarihi,
                updatedAt: item.olusturmaTarihi,
                author: 'System',
            });
        });

        return pages;
    },

    // Normalize a page entity (convert delta to status)
    normalizePage: (page: PageEntity): PageEntity => ({
        ...page,
        status: convertDeltaToStatus(page.delta),
    }),
};

// Error handling utility
export const handleApiError = (error: any) => {
    if (error.response) {
        // Server responded with error status
        const message = error.response.data?.message || 'Bir hata oluştu';
        const status = error.response.status;
        console.error(`API Error ${status}: ${message}`);
        return {message, status};
    } else if (error.request) {
        // Request was made but no response received
        console.error('Network Error: No response received');
        return {message: 'Ağ bağlantısı hatası', status: 0};
    } else {
        // Something else happened
        console.error('Error:', error.message);
        return {message: error.message, status: -1};
    }
};

export default {
    BaskanAPI,
    YonetimSemasiAPI,
    CombinedPageService,
    handleApiError,
    convertDeltaToStatus,
    convertStatusToDelta,
};
