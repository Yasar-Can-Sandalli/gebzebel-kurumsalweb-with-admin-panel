// src/types/raporlar.ts
export interface Rapor {
    raporId: number;
    raporBaslik: string;
    raporUrl: string;
    raporTarihi: string;   // ISO tarih
    raporDurum: boolean;
    categoryId: number;
    categoryName?: string;
}

export interface RaporCategory {
    categoryId: number;
    categoryName: string;
    raporlar: Rapor[];
}
