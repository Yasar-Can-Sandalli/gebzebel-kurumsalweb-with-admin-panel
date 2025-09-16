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