export interface Kategori {
    id: number;
    ad: string;
}

export interface Haber {
    id: number;
    baslik: string;
    tarih: string;     // backend LocalDate → string
    aciklama: string;
    resim1?: string;
    resim2?: string;
    kategori: Kategori | null;
}
