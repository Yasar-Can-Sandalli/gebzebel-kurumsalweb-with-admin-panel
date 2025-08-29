package com.kocaeli.bel.DTO.imar;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class ImarRuhsatDTO {
    

    private String basvuruNo;
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate basvuruTarihi;
    
    private String basvuruTuru;
    private String basvuruDurumu;
    
    // Başvuru sahibi bilgileri
    private String basvuruSahibiAdi;
    private String basvuruSahibiSoyadi;
    private String basvuruSahibiTcno;
    private String basvuruSahibiTelefon;
    private String basvuruSahibiEmail;
    
    // Arsa bilgileri
    private String arsaAdresi;
    private String arsaParselNo;
    private String arsaAdaNo;
    private String arsaPaftaNo;
    private Double arsaAlani;
    
    // Yapı bilgileri
    private Double yapiAlani;
    private Integer katSayisi;
    private Integer daireSayisi;
    private String yapiTuru;
    private String yapiKullanimAmaci;
    
    // Proje bilgileri
    private String projeMimari;
    private String projeMuhendisi;
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate projeTarihi;
    
    // Ruhsat bilgileri
    private String ruhsatNo;
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate ruhsatTarihi;
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate ruhsatGecerlilikTarihi;
    
    // Onay bilgileri
    private String onayMakami;
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate onayTarihi;
    
    private String redSebebi;
    private String notlar;
    private String dosyaYolu;
    
    // Sistem bilgileri
    private Integer aktif;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime olusturmaTarihi;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime guncellemeTarihi;
    
    private String olusturanKullanici;
    private String guncelleyenKullanici;
    
    // Default constructor
    public ImarRuhsatDTO() {
    }
    
    // Constructor with basic fields
    public ImarRuhsatDTO(String basvuruNo, String basvuruTuru, String basvuruSahibiAdi, 
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
    
    // Constructor with all fields
    public ImarRuhsatDTO(Long id, String basvuruNo, LocalDate basvuruTarihi, String basvuruTuru, 
                        String basvuruDurumu, String basvuruSahibiAdi, String basvuruSahibiSoyadi, 
                        String basvuruSahibiTcno, String basvuruSahibiTelefon, String basvuruSahibiEmail,
                        String arsaAdresi, String arsaParselNo, String arsaAdaNo, String arsaPaftaNo, 
                        Double arsaAlani, Double yapiAlani, Integer katSayisi, Integer daireSayisi, 
                        String yapiTuru, String yapiKullanimAmaci, String projeMimari, String projeMuhendisi, 
                        LocalDate projeTarihi, String ruhsatNo, LocalDate ruhsatTarihi, 
                        LocalDate ruhsatGecerlilikTarihi, String onayMakami, LocalDate onayTarihi, 
                        String redSebebi, String notlar, String dosyaYolu, Integer aktif, 
                        LocalDateTime olusturmaTarihi, LocalDateTime guncellemeTarihi, 
                        String olusturanKullanici, String guncelleyenKullanici) {

        this.basvuruNo = basvuruNo;
        this.basvuruTarihi = basvuruTarihi;
        this.basvuruTuru = basvuruTuru;
        this.basvuruDurumu = basvuruDurumu;
        this.basvuruSahibiAdi = basvuruSahibiAdi;
        this.basvuruSahibiSoyadi = basvuruSahibiSoyadi;
        this.basvuruSahibiTcno = basvuruSahibiTcno;
        this.basvuruSahibiTelefon = basvuruSahibiTelefon;
        this.basvuruSahibiEmail = basvuruSahibiEmail;
        this.arsaAdresi = arsaAdresi;
        this.arsaParselNo = arsaParselNo;
        this.arsaAdaNo = arsaAdaNo;
        this.arsaPaftaNo = arsaPaftaNo;
        this.arsaAlani = arsaAlani;
        this.yapiAlani = yapiAlani;
        this.katSayisi = katSayisi;
        this.daireSayisi = daireSayisi;
        this.yapiTuru = yapiTuru;
        this.yapiKullanimAmaci = yapiKullanimAmaci;
        this.projeMimari = projeMimari;
        this.projeMuhendisi = projeMuhendisi;
        this.projeTarihi = projeTarihi;
        this.ruhsatNo = ruhsatNo;
        this.ruhsatTarihi = ruhsatTarihi;
        this.ruhsatGecerlilikTarihi = ruhsatGecerlilikTarihi;
        this.onayMakami = onayMakami;
        this.onayTarihi = onayTarihi;
        this.redSebebi = redSebebi;
        this.notlar = notlar;
        this.dosyaYolu = dosyaYolu;
        this.aktif = aktif;
        this.olusturmaTarihi = olusturmaTarihi;
        this.guncellemeTarihi = guncellemeTarihi;
        this.olusturanKullanici = olusturanKullanici;
        this.guncelleyenKullanici = guncelleyenKullanici;
    }
}
