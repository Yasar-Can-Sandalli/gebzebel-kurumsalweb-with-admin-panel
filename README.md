# Kocaeli Belediyesi Projesi

Bu proje, Kocaeli Belediyesi'nin kurumsal web sitesi ve yönetim paneli için geliştirilmiş bir tam yığın (full-stack) uygulamadır. Proje, Java Spring Boot tabanlı bir backend ve React tabanlı bir frontend içerir.

## Proje Yapısı

```
KocaeliBelProje/
│
├── src/                         # Java Spring Boot backend kaynak kodları
│   └── main/
│       └── java/
│           └── com/kocaeli/bel/
│               ├── controller/  # REST API controller'ları
│               ├── model/       # JPA entity sınıfları
│               ├── repository/  # Spring Data repository'leri
│               └── service/     # İş mantığı (service) katmanı
│
├── MEGAFrontEnd/ReactFront/     # React frontend uygulaması
│   └── react/
│       └── src/
│           └── components/       # React JS dosyaları
│               └── AdminPanel/  # Yönetim paneli bileşenleri
│
└── README.md                    # Proje açıklaması (bu dosya)
```

## Özellikler

- **Kurumsal Sayfalar Yönetimi:** Başkan, misyon, vizyon, ilkeler, yönetim şeması ve arabuluculuk gibi kurumsal içeriklerin yönetimi.
- **Yetkilendirme:** Kullanıcı bazlı yetkilendirme ve erişim kontrolü.
- **RESTful API:** Backend, React frontend ile haberleşmek için REST API sağlar.
- **Modern Arayüz:** React ve Tailwind CSS ile geliştirilmiş kullanıcı dostu yönetim paneli.
- **Çoklu Tablo ve Kategori Desteği:** Farklı veri tabloları ve kategoriler için dinamik yapı.

## Kurulum

### Backend (Spring Boot)

1. Java 17+ ve Maven kurulu olmalıdır.
2. `src/main/resources/application.properties` dosyasını veritabanı ayarlarınıza göre düzenleyin.
3. Terminalde proje kök dizininde:
    ```sh
    mvn clean install
    mvn spring-boot:run
    ```
4. API, varsayılan olarak `http://localhost:8080` adresinde çalışır.

### Frontend (React)

1. Node.js 18+ ve npm kurulu olmalıdır.
2. `MEGAFrontEnd/ReactFront/react` dizinine gidin:
    ```sh
    cd MEGAFrontEnd/ReactFront/react
    npm install
    npm run dev
    ```
3. Frontend, varsayılan olarak `http://localhost:5173` adresinde çalışır.

## Kullanım

- Yönetim paneline giriş yaptıktan sonra, kurumsal sayfaları ve yönetim şemasını ekleyebilir, düzenleyebilir veya silebilirsiniz.
- Yetkiler, kullanıcı rollerine göre belirlenir.
- API endpointleri `/api/kurumsal` altında toplanmıştır.

## Hibernate Yapılandırması

Proje, Oracle veritabanı ile bağlantı için HikariCP ve Hibernate kullanır. Hibernate ayarları `HibernateConfig.java` dosyasında yapılandırılmıştır. Temel ayarlar şunlardır:

- **hibernate.dialect:** OracleDialect/Oracle12cDialect kullanılır.
- **hibernate.hbm2ddl.auto:** update (var olan tablo yapısını günceller, üretim ortamında dikkatli kullanılmalıdır).
- **hibernate.show_sql:** true (SQL sorgularını konsolda gösterir).
- **hibernate.format_sql:** true (SQL çıktısını okunabilir hale getirir).
- **hibernate.jdbc.lob.non_contextual_creation:** true (LOB desteği için önerilir).

Örnek konfigürasyon:
```java
@Bean
public DataSource dataSource() {
    HikariDataSource dataSource = new HikariDataSource();
    dataSource.setDriverClassName("oracle.jdbc.OracleDriver");
    dataSource.setJdbcUrl("jdbc:oracle:thin:@//localhost:1521/FREE");
    dataSource.setUsername("KullanıcıAdı");
    dataSource.setPassword("Sifre");
    return dataSource;
}
```
Daha fazla detay için: `src/main/java/com/kocaeli/bel/config/HibernateConfig.java` dosyasına bakınız.

## Veritabanı Yedeği (Export/Import)

Proje Oracle veritabanı kullandığı için, veritabanı yedeği almak veya başka bir ortama aktarmak için Oracle'ın `exp` ve `imp` (veya daha güncel olarak `expdp` ve `impdp`) araçları kullanılabilir. Bu işlemler sonucunda `.dmp` uzantılı dump dosyaları elde edilir.

### Export (Yedek Alma)

Aşağıdaki komut ile ilgili kullanıcıya ait tüm veritabanı nesneleri bir DMP dosyasına aktarılır:

```sh
expdp KULLANICI_ADI/SIFRE@localhost:1521/FREE schemas=KULLANICI_ADI directory=EXPORT_DIR dumpfile=backup.dmp logfile=backup.log
```

### Import (Yedekten Geri Yükleme)

Alınan dump dosyasını başka bir veritabanına yüklemek için:

```sh
impdp C##ERAY/123456@localhost:1521/FREE schemas=C##ERAY directory=EXPORT_DIR dumpfile=backup.dmp logfile=import.log


```

> **Not:** `directory=EXPORT_DIR` ifadesi, Oracle'da önceden tanımlanmış bir dizin nesnesi olmalıdır. Gerekirse DBA ile iletişime geçerek oluşturabilirsiniz.

> **Not:** Kullanıcı yetkileri [PermissionService.java](src/main/java/com/kocaeli/bel/service/PermissionService.java) dosyasının içinde default değer olarak ayarlanmıştır. Yeni kullanıcı yetkileri bu dosyada güncellenebilir.

## Eksik Kısımlar

### Backend
- Panel sayfalarının stilleri geliştirilebilir.
- Kurumsal kategorisinde yalnızca Başkan, Misyon, Vizyon ve İlkeler sayfaları bulunmaktadır. Diğer sayfaların fonksiyonları henüz eklenmemiştir.
    - Eksik olan diğer kategoriler: **GEBZE**, **HİZMETLER**, **YAYINLAR**, **ETKİNLİKLER**, **HABERLER**, **DUYURULAR**, **İLETİŞİM** vb.
  - Sayfa URL'leri sabit olarak ayarlanmıştır, dinamik hale getirilmesi gerekmektedir.