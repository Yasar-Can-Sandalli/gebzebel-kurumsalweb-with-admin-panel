# Şikayet ve İletişim Servisi

## 📋 Genel Bakış

Şikayet ve İletişim Servisi, vatandaşların belediye hizmetleri hakkında şikayet, öneri ve sorularını iletebileceği, personelin bu talepleri yönetebileceği kapsamlı bir sistemdir.

## 🚀 Özellikler

### Temel Özellikler
- **Şikayet Kaydetme**: Vatandaşlar şikayet ve önerilerini kaydedebilir
- **Kategori Sistemi**: Şikayetler kategorilere ayrılır (Altyapı, Trafik, Temizlik, vb.)
- **Öncelik Sistemi**: Düşük, Normal, Yüksek öncelik seviyeleri
- **Durum Takibi**: Beklemede, İnceleniyor, Yanıtlandı, Kapandı
- **Yanıt Sistemi**: Personel şikayetlere yanıt verebilir
- **Konum Bilgisi**: Mahalle ve ilçe bazlı filtreleme

### Gelişmiş Özellikler
- **Arama ve Filtreleme**: Metin araması, durum, kategori, öncelik filtreleri
- **İstatistik ve Raporlama**: Toplam sayı, durum bazlı sayılar
- **Tarih Bazlı Sorgular**: Belirli tarih aralığında şikayetler
- **Personel Takibi**: Hangi personelin hangi şikayetleri yanıtladığı
- **Acil Şikayetler**: Yüksek öncelikli şikayetlerin öncelikli işlenmesi

## 🏗️ Teknik Mimari

### Backend (Java/Spring Boot)

#### Entity
```java
@Entity
@Table(name = "SIKAYET_ILETISIM")
public class SikayetIletisim {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String adSoyad;
    private String eMail;
    private String telefon;
    private String konu;
    private String mesaj;
    private String kategori;
    private String oncelik;
    private String durum;
    private LocalDateTime olusturmaTarihi;
    private LocalDateTime guncellemeTarihi;
    private String yanit;
    private String yanitlayanPersonel;
    private LocalDateTime yanitTarihi;
    private String adres;
    private String mahalle;
    private String ilce;
}
```

#### Repository
- `SikayetIletisimRepository` - JPA repository interface
- Özel sorgu metodları (durum, kategori, öncelik bazlı)
- Arama ve filtreleme metodları
- Tarih aralığı sorguları

#### Service
- `SikayetIletisimService` - Business logic interface
- `SikayetIletisimServiceImpl` - Service implementation
- CRUD işlemleri, durum güncelleme, yanıt ekleme
- İstatistik ve raporlama metodları

#### Controller
- `SikayetIletisimController` - REST API endpoints
- `/api/sikayet-iletisim` base path
- Tüm CRUD ve özel işlemler için endpoint'ler

### Frontend (React/TypeScript)

#### Service
- `SikayetIletisimService` - API ile iletişim
- Tüm backend metodları için frontend wrapper'ları
- Error handling ve logging

#### Component
- `SikayetIletisimYonetimi` - Ana yönetim component'i
- Şikayet listesi, ekleme, düzenleme, silme
- Arama ve filtreleme arayüzü
- Yanıt ekleme modal'ı

## 🗄️ Veritabanı Yapısı

### Tablo: SIKAYET_ILETISIM

| Kolon | Tip | Açıklama |
|-------|-----|----------|
| ID | NUMBER | Birincil anahtar (Auto-increment) |
| AD_SOYAD | VARCHAR2(100) | Şikayet eden kişinin adı soyadı |
| E_MAIL | VARCHAR2(100) | E-posta adresi |
| TELEFON | VARCHAR2(20) | Telefon numarası |
| KONU | VARCHAR2(200) | Şikayet konusu |
| MESAJ | CLOB | Şikayet detayı |
| KATEGORI | VARCHAR2(50) | Şikayet kategorisi |
| ONCELIK | VARCHAR2(20) | Öncelik seviyesi |
| DURUM | VARCHAR2(30) | Şikayet durumu |
| OLUSTURMA_TARIHI | TIMESTAMP | Oluşturulma tarihi |
| GUNCELLEME_TARIHI | TIMESTAMP | Son güncelleme tarihi |
| YANIT | CLOB | Personel yanıtı |
| YANITLAYAN_PERSONEL | VARCHAR2(100) | Yanıtlayan personel adı |
| YANIT_TARIHI | TIMESTAMP | Yanıt tarihi |
| ADRES | VARCHAR2(500) | Şikayet adresi |
| MAHALLE | VARCHAR2(100) | Mahalle adı |
| ILCE | VARCHAR2(50) | İlçe adı |

### İndeksler
- `IDX_SIKAYET_DURUM` - Durum bazlı sorgular için
- `IDX_SIKAYET_KATEGORI` - Kategori bazlı sorgular için
- `IDX_SIKAYET_ONCELIK` - Öncelik bazlı sorgular için
- `IDX_SIKAYET_OLUSTURMA_TARIHI` - Tarih bazlı sorgular için
- `IDX_SIKAYET_MAHALLE` - Mahalle bazlı sorgular için
- `IDX_SIKAYET_ILCE` - İlçe bazlı sorgular için
- `IDX_SIKAYET_EMAIL` - E-mail bazlı sorgular için
- `IDX_SIKAYET_TELEFON` - Telefon bazlı sorgular için

## 🔌 API Endpoints

### Temel CRUD İşlemleri
- `GET /api/sikayet-iletisim` - Tüm şikayetleri getir
- `GET /api/sikayet-iletisim/{id}` - Belirli şikayeti getir
- `POST /api/sikayet-iletisim` - Yeni şikayet oluştur
- `PUT /api/sikayet-iletisim/{id}` - Şikayet güncelle
- `DELETE /api/sikayet-iletisim/{id}` - Şikayet sil

### Durum İşlemleri
- `GET /api/sikayet-iletisim/durum/{durum}` - Duruma göre şikayetler
- `PUT /api/sikayet-iletisim/{id}/durum` - Durum güncelle

### Kategori ve Öncelik
- `GET /api/sikayet-iletisim/kategori/{kategori}` - Kategoriye göre şikayetler
- `GET /api/sikayet-iletisim/oncelik/{oncelik}` - Önceliğe göre şikayetler
- `PUT /api/sikayet-iletisim/{id}/oncelik` - Öncelik güncelle

### Arama ve Filtreleme
- `GET /api/sikayet-iletisim/arama?q={arama}` - Metin araması
- `GET /api/sikayet-iletisim/durum-ve-arama?durum={durum}&q={arama}` - Durum + arama

### Yanıt İşlemleri
- `POST /api/sikayet-iletisim/{id}/yanit` - Yanıt ekle
- `GET /api/sikayet-iletisim/yanitlanmamis` - Yanıtlanmamış şikayetler
- `GET /api/sikayet-iletisim/yanitlanmis` - Yanıtlanmış şikayetler

### Konum Bazlı
- `GET /api/sikayet-iletisim/mahalle/{mahalle}` - Mahalleye göre şikayetler
- `GET /api/sikayet-iletisim/ilce/{ilce}` - İlçeye göre şikayetler

### Tarih Bazlı
- `GET /api/sikayet-iletisim/son-gunler/{gunSayisi}` - Son günlerdeki şikayetler
- `GET /api/sikayet-iletisim/tarih-araligi?baslangic={baslangic}&bitis={bitis}` - Tarih aralığı

### İstatistik ve Raporlama
- `GET /api/sikayet-iletisim/istatistik/toplam` - Toplam şikayet sayısı
- `GET /api/sikayet-iletisim/istatistik/durum/{durum}` - Duruma göre sayı
- `GET /api/sikayet-iletisim/istatistik/kategori/{kategori}` - Kategoriye göre sayı

### Özel Sorgular
- `GET /api/sikayet-iletisim/acil` - Acil şikayetler
- `GET /api/sikayet-iletisim/sirali/oncelik-tarih` - Öncelik ve tarihe göre sıralı
- `GET /api/sikayet-iletisim/sirali/tarih` - Tarihe göre sıralı

## 📊 Sabit Değerler

### Kategoriler
- `ALTYAPI` - Altyapı
- `TRAFIK` - Trafik
- `TEMIZLIK` - Temizlik
- `PARK_BAHCE` - Park ve Bahçe
- `AYDINLATMA` - Aydınlatma
- `GUVENLIK` - Güvenlik
- `SAGLIK` - Sağlık
- `EGITIM` - Eğitim
- `KULTUR` - Kültür ve Sanat
- `SPOR` - Spor
- `DIGER` - Diğer

### Öncelik Seviyeleri
- `DÜŞÜK` - Düşük
- `NORMAL` - Normal
- `YÜKSEK` - Yüksek

### Durumlar
- `BEKLEMEDE` - Beklemede
- `INCELENIYOR` - İnceleniyor
- `YANITLANDI` - Yanıtlandı
- `KAPANDI` - Kapandı

## 🔒 Güvenlik

- CORS desteği (`@CrossOrigin(origins = "*")`)
- Input validation
- Error handling ve logging
- SQL injection koruması (JPA/Hibernate)

## 🧪 Test

### Backend Test
```bash
# Maven ile test
mvn test

# Belirli test sınıfı
mvn test -Dtest=SikayetIletisimServiceTest
```

### Frontend Test
```bash
# React test
npm test

# Belirli test dosyası
npm test SikayetIletisimYonetimi.test.tsx
```

## 🚀 Kurulum ve Çalıştırma

### Backend
1. Java 17+ ve Maven kurulumu
2. Veritabanı bağlantı ayarları (`application.properties`)
3. Migration script'lerini çalıştır
4. `mvn spring-boot:run`

### Frontend
1. Node.js 16+ kurulumu
2. `npm install`
3. `npm start`

## 📝 Kullanım Örnekleri

### Yeni Şikayet Oluşturma
```typescript
const yeniSikayet: SikayetIletisimDTO = {
    adSoyad: "Ahmet Yılmaz",
    eMail: "ahmet@email.com",
    telefon: "0532 123 45 67",
    konu: "Yol Çalışması",
    mesaj: "Merkez mahallede yol çalışması yapılıyor, trafik çok sıkışık.",
    kategori: "ALTYAPI",
    adres: "Merkez Mah. Atatürk Cad. No:123",
    mahalle: "Merkez",
    ilce: "Gebze"
};

const kaydedilenSikayet = await SikayetIletisimService.sikayetKaydet(yeniSikayet);
```

### Şikayet Arama
```typescript
// Metin araması
const aramaSonuclari = await SikayetIletisimService.aramaYap("yol çalışması");

// Durum ve arama kombinasyonu
const durumArama = await SikayetIletisimService.durumVeAramaYap("BEKLEMEDE", "trafik");

// Kategoriye göre
const kategoriSonuclari = await SikayetIletisimService.kategoriyeGoreGetir("ALTYAPI");
```

### Yanıt Ekleme
```typescript
const yanitlananSikayet = await SikayetIletisimService.yanitEkle(
    1, // şikayet ID
    "Şikayetiniz incelenmiştir. Gerekli önlemler alınmaktadır.",
    "Mehmet Özkan" // yanıtlayan personel
);
```

### İstatistik Sorgulama
```typescript
const toplamSayi = await SikayetIletisimService.toplamSikayetSayisi();
const bekleyenSayi = await SikayetIletisimService.durumaGoreSikayetSayisi("BEKLEMEDE");
const altyapiSayi = await SikayetIletisimService.kategoriyeGoreSikayetSayisi("ALTYAPI");
```

## 🔮 Gelecek Geliştirmeler

- **E-posta Bildirimleri**: Şikayet durumu değişikliklerinde otomatik bildirim
- **SMS Entegrasyonu**: Acil şikayetler için SMS bildirimi
- **Mobil Uygulama**: Vatandaşlar için mobil şikayet uygulaması
- **Harita Entegrasyonu**: Şikayet lokasyonlarının harita üzerinde gösterimi
- **Dosya Ekleme**: Fotoğraf ve belge ekleme desteği
- **Çoklu Dil**: Uluslararası dil desteği
- **API Rate Limiting**: API kullanım limitleri
- **Caching**: Redis ile performans optimizasyonu
- **Monitoring**: Prometheus/Grafana ile sistem izleme
- **Audit Log**: Tüm değişikliklerin detaylı loglanması

## 📞 Destek

Herhangi bir sorun veya öneri için:
- **E-posta**: destek@gebze.bel.tr
- **Telefon**: 0262 XXX XX XX
- **Dokümantasyon**: [API Docs](http://localhost:8080/swagger-ui.html)

## 📄 Lisans

Bu proje Gebze Belediyesi tarafından geliştirilmiştir. Tüm hakları saklıdır.

---

**Son Güncelleme**: 2024-12-19  
**Versiyon**: 1.0.0  
**Geliştirici**: Gebze Belediyesi IT Ekibi 