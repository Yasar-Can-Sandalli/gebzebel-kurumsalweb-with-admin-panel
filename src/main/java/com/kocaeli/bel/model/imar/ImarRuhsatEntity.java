package com.kocaeli.bel.model.imar;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "IMAR_RUHSAT")
@Data
public class ImarRuhsatEntity {
    
    @Id
    @Column(name = "ID")
    private Long id;
    
    @Column(name = "BASVURU_NO", unique = true, nullable = false)
    private String basvuruNo;
    
    @Column(name = "BASVURU_TARIHI", nullable = false)
    private LocalDate basvuruTarihi;
    
    @Column(name = "BASVURU_TURU", nullable = false)
    private String basvuruTuru; // YAPI_RUHSATI, ISKAN_RUHSATI, IMAR_DURUMU, TADILAT_RUHSATI
    
    @Column(name = "BASVURU_DURUMU", nullable = false)
    private String basvuruDurumu; // BEKLEMEDE, INCELENIYOR, ONAYLANDI, REDDEDILDI, TAMAMLANDI
    
    @Column(name = "BASVURU_SAHIBI_ADI", nullable = false)
    private String basvuruSahibiAdi;
    
    @Column(name = "BASVURU_SAHIBI_SOYADI", nullable = false)
    private String basvuruSahibiSoyadi;
    
    @Column(name = "BASVURU_SAHIBI_TCNO", nullable = false)
    private String basvuruSahibiTcno;
    
    @Column(name = "BASVURU_SAHIBI_TELEFON")
    private String basvuruSahibiTelefon;
    
    @Column(name = "BASVURU_SAHIBI_EMAIL")
    private String basvuruSahibiEmail;
    
    @Column(name = "ARSA_ADRESI", nullable = false)
    private String arsaAdresi;
    
    @Column(name = "ARSA_PARSEL_NO")
    private String arsaParselNo;
    
    @Column(name = "ARSA_ADA_NO")
    private String arsaAdaNo;
    
    @Column(name = "ARSA_PAFTA_NO")
    private String arsaPaftaNo;
    
    @Column(name = "ARSA_ALANI")
    private Double arsaAlani; // m²
    
    @Column(name = "YAPI_ALANI")
    private Double yapiAlani; // m²
    
    @Column(name = "KAT_SAYISI")
    private Integer katSayisi;
    
    @Column(name = "DAIRE_SAYISI")
    private Integer daireSayisi;
    
    @Column(name = "YAPI_TURU")
    private String yapiTuru; // KONUT, TICARI, ENDUSTRIYEL, KAMU
    
    @Column(name = "YAPI_KULLANIM_AMACI")
    private String yapiKullanimAmaci;
    
    @Column(name = "PROJE_MIMARI")
    private String projeMimari;
    
    @Column(name = "PROJE_MUHENDISI")
    private String projeMuhendisi;
    
    @Column(name = "PROJE_TARIHI")
    private LocalDate projeTarihi;
    
    @Column(name = "RUHSAT_NO")
    private String ruhsatNo;
    
    @Column(name = "RUHSAT_TARIHI")
    private LocalDate ruhsatTarihi;
    
    @Column(name = "RUHSAT_GECERLILIK_TARIHI")
    private LocalDate ruhsatGecerlilikTarihi;
    
    @Column(name = "ONAY_MAKAMI")
    private String onayMakami;
    
    @Column(name = "ONAY_TARIHI")
    private LocalDate onayTarihi;
    
    @Column(name = "RED_SEBEBI")
    private String redSebebi;
    
    @Column(name = "NOTLAR", length = 2000)
    private String notlar;
    
    @Column(name = "DOSYA_YOLU")
    private String dosyaYolu;
    
    @Column(name = "AKTIF", nullable = false)
    private Integer aktif = 1; // 1: aktif, 0: pasif
    
    @Column(name = "OLUSTURMA_TARIHI", nullable = false)
    private LocalDateTime olusturmaTarihi = LocalDateTime.now();
    
    @Column(name = "GUNCELLEME_TARIHI")
    private LocalDateTime guncellemeTarihi;
    
    @Column(name = "OLUSTURAN_KULLANICI")
    private String olusturanKullanici;
    
    @Column(name = "GUNCELLEYEN_KULLANICI")
    private String guncelleyenKullanici;
    
    // Default constructor
    public ImarRuhsatEntity() {
    }
    
    // Constructor with basic fields
    public ImarRuhsatEntity(String basvuruNo, String basvuruTuru, String basvuruSahibiAdi, 
                           String basvuruSahibiSoyadi, String basvuruSahibiTcno, String arsaAdresi) {
        this.basvuruNo = basvuruNo;
        this.basvuruTuru = basvuruTuru;
        this.basvuruSahibiAdi = basvuruSahibiAdi;
        this.basvuruSahibiSoyadi = basvuruSahibiSoyadi;
        this.basvuruSahibiTcno = basvuruSahibiTcno;
        this.arsaAdresi = arsaAdresi;
        this.basvuruTarihi = LocalDate.now();
        this.basvuruDurumu = "BEKLEMEDE";
        this.aktif = 1;
        this.olusturmaTarihi = LocalDateTime.now();
    }
}
