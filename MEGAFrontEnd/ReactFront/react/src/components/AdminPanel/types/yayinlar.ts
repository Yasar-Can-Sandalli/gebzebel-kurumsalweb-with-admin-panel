// src/types/yayinlar.ts
export interface Yayin {
    yayinId: number;
    yayinBaslik: string;
    yayinUrl: string;
    description: string;
    categoryId: number;
    categoryName?: string;
}

export interface YayinCategory {
    categoryId: number;
    categoryName: string;
    yayinlar: Yayin[];
}

// YENİ TİP: Kategori listesi için daha sade versiyon
export interface YayinCategorySummary {
    categoryId: number;
    categoryName: string;
}