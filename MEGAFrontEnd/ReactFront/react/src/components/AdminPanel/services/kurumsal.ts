// src/types/kurumsal.ts
export type KVMIKategori = 'vizyon' | 'misyon' | 'ilkelerimiz';

export interface KVMIItem {
    id: number;
    kategori: KVMIKategori;    // 'vizyon' | 'misyon' | 'ilkelerimiz'
    icerik: string;            // HTML content (DB'den geliyor)
    imageUrl?: string | null;  // opsiyonel
    durum?: 'Aktif' | 'Arşivlendi' | 'Taslak';
    updatedAt?: string;        // ISO tarih (örn. 2025-08-24T12:34:56Z)
}

// Eğer backend "data" zarfıyla dönüyorsa kullanmak için opsiyonel tip:
export interface ApiEnvelope<T> {
    data: T;
    message?: string;
    success?: boolean;
}