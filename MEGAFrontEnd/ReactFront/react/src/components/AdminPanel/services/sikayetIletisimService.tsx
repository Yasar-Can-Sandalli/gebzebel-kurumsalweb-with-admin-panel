import apiClient from './apiService';

export interface SikayetIletisimDTO {
    id?: number;
    adSoyad: string;
    eMail?: string;
    telefon?: string;
    konu: string;
    mesaj: string;
    kategori?: string;
    oncelik?: string;
    durum?: string;
    olusturmaTarihi?: string;
    guncellemeTarihi?: string;
    yanit?: string;
    yanitlayanPersonel?: string;
    yanitTarihi?: string;
    adres?: string;
    mahalle?: string;
    ilce?: string;
}

export class SikayetIletisimService {

    // Temel CRUD işlemleri
    static async tumSikayetleriGetir(): Promise<SikayetIletisimDTO[]> {
        try {
            return await apiClient.get('/api/sikayet-iletisim');
        } catch (error) {
            console.error('Şikayetler getirilirken hata:', error);
            throw error;
        }
    }

    static async sikayetGetir(id: number): Promise<SikayetIletisimDTO> {
        try {
            return await apiClient.get(`/api/sikayet-iletisim/${id}`);
        } catch (error) {
            console.error('Şikayet getirilirken hata:', error);
            throw error;
        }
    }

    static async sikayetKaydet(dto: SikayetIletisimDTO): Promise<SikayetIletisimDTO> {
        try {
            return await apiClient.post('/api/sikayet-iletisim', dto);
        } catch (error) {
            console.error('Şikayet kaydedilirken hata:', error);
            throw error;
        }
    }

    static async sikayetGuncelle(id: number, dto: SikayetIletisimDTO): Promise<SikayetIletisimDTO> {
        try {
            return await apiClient.put(`/api/sikayet-iletisim/${id}`, dto);
        } catch (error) {
            console.error('Şikayet güncellenirken hata:', error);
            throw error;
        }
    }

    static async sikayetSil(id: number): Promise<void> {
        try {
            await apiClient.delete(`/api/sikayet-iletisim/${id}`);
        } catch (error) {
            console.error('Şikayet silinirken hata:', error);
            throw error;
        }
    }

    // Durum işlemleri
    static async durumaGoreGetir(durum: string): Promise<SikayetIletisimDTO[]> {
        try {
            return await apiClient.get(`/api/sikayet-iletisim/durum/${durum}`);
        } catch (error) {
            console.error('Duruma göre şikayetler getirilirken hata:', error);
            throw error;
        }
    }

    static async durumGuncelle(id: number, yeniDurum: string): Promise<SikayetIletisimDTO> {
        try {
            return await apiClient.put(`/api/sikayet-iletisim/${id}/durum`, null, { params: { yeniDurum } });
        } catch (error) {
            console.error('Durum güncellenirken hata:', error);
            throw error;
        }
    }

    // Kategori işlemleri
    static async kategoriyeGoreGetir(kategori: string): Promise<SikayetIletisimDTO[]> {
        try {
            return await apiClient.get(`/api/sikayet-iletisim/kategori/${kategori}`);
        } catch (error) {
            console.error('Kategoriye göre şikayetler getirilirken hata:', error);
            throw error;
        }
    }

    // Öncelik işlemleri
    static async onceligeGoreGetir(oncelik: string): Promise<SikayetIletisimDTO[]> {
        try {
            return await apiClient.get(`/api/sikayet-iletisim/oncelik/${oncelik}`);
        } catch (error) {
            console.error('Önceliğe göre şikayetler getirilirken hata:', error);
            throw error;
        }
    }

    static async oncelikGuncelle(id: number, yeniOncelik: string): Promise<SikayetIletisimDTO> {
        try {
            return await apiClient.put(`/api/sikayet-iletisim/${id}/oncelik`, null, { params: { yeniOncelik } });
        } catch (error) {
            console.error('Öncelik güncellenirken hata:', error);
            throw error;
        }
    }

    // Arama işlemleri
    static async aramaYap(arama: string): Promise<SikayetIletisimDTO[]> {
        try {
            return await apiClient.get('/api/sikayet-iletisim/arama', { params: { q: arama } });
        } catch (error) {
            console.error('Arama yapılırken hata:', error);
            throw error;
        }
    }

    static async durumVeAramaYap(durum: string, arama: string): Promise<SikayetIletisimDTO[]> {
        try {
            return await apiClient.get('/api/sikayet-iletisim/durum-ve-arama', { params: { durum, q: arama } });
        } catch (error) {
            console.error('Durum ve arama yapılırken hata:', error);
            throw error;
        }
    }

    // Yanıt işlemleri
    static async yanitEkle(id: number, yanit: string, yanitlayanPersonel: string): Promise<SikayetIletisimDTO> {
        try {
            return await apiClient.post(`/api/sikayet-iletisim/${id}/yanit`, null, {
                params: { yanit, yanitlayanPersonel }
            });
        } catch (error) {
            console.error('Yanıt eklenirken hata:', error);
            throw error;
        }
    }

    static async yanitlanmamisSikayetler(): Promise<SikayetIletisimDTO[]> {
        try {
            return await apiClient.get('/api/sikayet-iletisim/yanitlanmamis');
        } catch (error) {
            console.error('Yanıtlanmamış şikayetler getirilirken hata:', error);
            throw error;
        }
    }

    static async yanitlanmisSikayetler(): Promise<SikayetIletisimDTO[]> {
        try {
            return await apiClient.get('/api/sikayet-iletisim/yanitlanmis');
        } catch (error) {
            console.error('Yanıtlanmış şikayetler getirilirken hata:', error);
            throw error;
        }
    }

    // Konum bazlı işlemler
    static async mahalleyeGoreGetir(mahalle: string): Promise<SikayetIletisimDTO[]> {
        try {
            return await apiClient.get(`/api/sikayet-iletisim/mahalle/${mahalle}`);
        } catch (error) {
            console.error('Mahalleye göre şikayetler getirilirken hata:', error);
            throw error;
        }
    }

    static async ilceyeGoreGetir(ilce: string): Promise<SikayetIletisimDTO[]> {
        try {
            return await apiClient.get(`/api/sikayet-iletisim/ilce/${ilce}`);
        } catch (error) {
            console.error('İlçeye göre şikayetler getirilirken hata:', error);
            throw error;
        }
    }

    // Tarih bazlı işlemler
    static async sonGunlerdekiSikayetler(gunSayisi: number): Promise<SikayetIletisimDTO[]> {
        try {
            return await apiClient.get(`/api/sikayet-iletisim/son-gunler/${gunSayisi}`);
        } catch (error) {
            console.error('Son günlerdeki şikayetler getirilirken hata:', error);
            throw error;
        }
    }

    // İletişim bilgilerine göre
    static async eMailIleGetir(email: string): Promise<SikayetIletisimDTO[]> {
        try {
            return await apiClient.get(`/api/sikayet-iletisim/email/${email}`);
        } catch (error) {
            console.error('E-mail ile şikayetler getirilirken hata:', error);
            throw error;
        }
    }

    static async telefonIleGetir(telefon: string): Promise<SikayetIletisimDTO[]> {
        try {
            return await apiClient.get(`/api/sikayet-iletisim/telefon/${telefon}`);
        } catch (error) {
            console.error('Telefon ile şikayetler getirilirken hata:', error);
            throw error;
        }
    }

    // Personel bazlı işlemler
    static async personelTarafindanYanitlananlar(yanitlayanPersonel: string): Promise<SikayetIletisimDTO[]> {
        try {
            return await apiClient.get(`/api/sikayet-iletisim/personel/${yanitlayanPersonel}`);
        } catch (error) {
            console.error('Personel tarafından yanıtlanan şikayetler getirilirken hata:', error);
            throw error;
        }
    }

    // İstatistik ve raporlama
    static async toplamSikayetSayisi(): Promise<number> {
        try {
            return await apiClient.get('/api/sikayet-iletisim/istatistik/toplam');
        } catch (error) {
            console.error('Toplam şikayet sayısı getirilirken hata:', error);
            throw error;
        }
    }

    static async durumaGoreSikayetSayisi(durum: string): Promise<number> {
        try {
            return await apiClient.get(`/api/sikayet-iletisim/istatistik/durum/${durum}`);
        } catch (error) {
            console.error('Duruma göre şikayet sayısı getirilirken hata:', error);
            throw error;
        }
    }

    static async kategoriyeGoreSikayetSayisi(kategori: string): Promise<number> {
        try {
            return await apiClient.get(`/api/sikayet-iletisim/istatistik/kategori/${kategori}`);
        } catch (error) {
            console.error('Kategoriye göre şikayet sayısı getirilirken hata:', error);
            throw error;
        }
    }

    // Acil şikayetler
    static async acilSikayetler(): Promise<SikayetIletisimDTO[]> {
        try {
            return await apiClient.get('/api/sikayet-iletisim/acil');
        } catch (error) {
            console.error('Acil şikayetler getirilirken hata:', error);
            throw error;
        }
    }

    // Sıralama
    static async oncelikVeTariheGoreSirala(): Promise<SikayetIletisimDTO[]> {
        try {
            return await apiClient.get('/api/sikayet-iletisim/sirali/oncelik-tarih');
        } catch (error) {
            console.error('Öncelik ve tarihe göre sıralama yapılırken hata:', error);
            throw error;
        }
    }

    static async tariheGoreSirala(): Promise<SikayetIletisimDTO[]> {
        try {
            return await apiClient.get('/api/sikayet-iletisim/sirali/tarih');
        } catch (error) {
            console.error('Tarihe göre sıralama yapılırken hata:', error);
            throw error;
        }
    }

    // Sabit değerler
    static getKategoriSecenekleri(): { value: string; label: string }[] {
        return [
            { value: 'ALTYAPI', label: 'Altyapı' },
            { value: 'TRAFIK', label: 'Trafik' },
            { value: 'TEMIZLIK', label: 'Temizlik' },
            { value: 'PARK_BAHCE', label: 'Park ve Bahçe' },
            { value: 'AYDINLATMA', label: 'Aydınlatma' },
            { value: 'GUVENLIK', label: 'Güvenlik' },
            { value: 'SAGLIK', label: 'Sağlık' },
            { value: 'EGITIM', label: 'Eğitim' },
            { value: 'KULTUR', label: 'Kültür ve Sanat' },
            { value: 'SPOR', label: 'Spor' },
            { value: 'DIGER', label: 'Diğer' }
        ];
    }

    static getOncelikSecenekleri(): { value: string; label: string }[] {
        return [
            { value: 'DÜŞÜK', label: 'Düşük' },
            { value: 'NORMAL', label: 'Normal' },
            { value: 'YÜKSEK', label: 'Yüksek' }
        ];
    }

    static getDurumSecenekleri(): { value: string; label: string }[] {
        return [
            { value: 'BEKLEMEDE', label: 'Beklemede' },
            { value: 'INCELENIYOR', label: 'İnceleniyor' },
            { value: 'YANITLANDI', label: 'Yanıtlandı' },
            { value: 'KAPANDI', label: 'Kapandı' }
        ];
    }
} 