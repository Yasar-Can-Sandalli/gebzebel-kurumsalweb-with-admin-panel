export interface Haber {
    haberlerId: number;
    haberBaslik: string;
    haberTarih: string;     // backend LocalDate → string
    haberAciklama: string;
    haberResim1?: string;
    haberResim2?: string;
    categoryId: number;
    categoryName: string;
}


export interface HaberCategory {
    categoryId: number;
    categoryName: string;
    haberler: Haber[];
}

export interface HaberCategorySummary {
    categoryId: number;
    categoryName: string;
}
