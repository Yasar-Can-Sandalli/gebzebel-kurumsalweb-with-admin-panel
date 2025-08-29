import { apiService } from './apiService';

export interface DuyuruDTO {
    id?: number;
    baslik: string;
    icerik: string;
    durum: string;
    olusturmaTarihi?: string;
    guncellemeTarihi?: string;
    olusturanKullanici: string;
}

export class DuyuruService {

    // Tüm duyuruları getir
    static async tumDuyurulariGetir(): Promise<DuyuruDTO[]> {
        try {
            return await apiService.get('/api/duyuru');
        } catch (error) {
            console.error('Duyurular getirilirken hata:', error);
            throw error;
        }
    }

    // ID'ye göre duyuru getir
    static async duyuruGetir(id: number): Promise<DuyuruDTO> {
        try {
            return await apiService.get(`/api/duyuru/${id}`);
        } catch (error) {
            console.error('Duyuru getirilirken hata:', error);
            throw error;
        }
    }

    // Yeni duyuru kaydet
    static async duyuruKaydet(dto: DuyuruDTO): Promise<DuyuruDTO> {
        try {
            return await apiService.post('/api/duyuru', dto);
        } catch (error) {
            console.error('Duyuru kaydedilirken hata:', error);
            throw error;
        }
    }

    // Duyuru güncelle
    static async duyuruGuncelle(id: number, dto: DuyuruDTO): Promise<DuyuruDTO> {
        try {
            return await apiService.put(`/api/duyuru/${id}`, dto);
        } catch (error) {
            console.error('Duyuru güncellenirken hata:', error);
            throw error;
        }
    }

    // Duyuru sil
    static async duyuruSil(id: number): Promise<void> {
        try {
            await apiService.delete(`/api/duyuru/${id}`);
        } catch (error) {
            console.error('Duyuru silinirken hata:', error);
            throw error;
        }
    }

    // Duruma göre duyuruları getir
    static async durumaGoreGetir(durum: string): Promise<DuyuruDTO[]> {
        try {
            return await apiService.get(`/api/duyuru/durum/${durum}`);
        } catch (error) {
            console.error('Duruma göre duyurular getirilirken hata:', error);
            throw error;
        }
    }

    // Arama yap
    static async aramaYap(arama: string): Promise<DuyuruDTO[]> {
        try {
            return await apiService.get('/api/duyuru/arama', { params: { q: arama } });
        } catch (error) {
            console.error('Arama yapılırken hata:', error);
            throw error;
        }
    }

    // Durum ve arama kombinasyonu
    static async durumVeAramaYap(durum: string, arama: string): Promise<DuyuruDTO[]> {
        try {
            return await apiService.get('/api/duyuru/durum-ve-arama', {
                params: { durum, q: arama }
            });
        } catch (error) {
            console.error('Durum ve arama yapılırken hata:', error);
            throw error;
        }
    }

    // Aktif duyuruları getir
    static async aktifDuyurulariGetir(): Promise<DuyuruDTO[]> {
        try {
            return await apiService.get('/api/duyuru/aktif');
        } catch (error) {
            console.error('Aktif duyurular getirilirken hata:', error);
            throw error;
        }
    }

    // Durum seçenekleri
    static getDurumSecenekleri(): { value: string; label: string }[] {
        return [
            { value: 'AKTIF', label: 'Aktif' },
            { value: 'PASIF', label: 'Pasif' },
            { value: 'TASLAK', label: 'Taslak' },
            { value: 'ARSIV', label: 'Arşiv' }
        ];
    }
} 