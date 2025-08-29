package com.kocaeli.bel.model.hizmetler;

import jakarta.persistence.*;

@Entity
@Table(name = "GERI_DONUSUM_DETAY")
public class GeriDonusumDetayliEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "RESIM_URL", length = 255)
    private String resimUrl;

    @Lob
    @Column(name = "DETAY")
    private String detay;

    @Column(name = "TABLO_BASLIK", length = 255)
    private String tabloBaslik;

    @Column(name = "TABLO_BASLIK_2", length = 255)
    private String tabloBaslik2;

    @Column(name = "TABLO_ADI", length = 255)
    private String tabloAdi;

    // Sütun 1 Satırlar
    @Column(name = "SUTUN_1_SATIR_1", length = 255) private String sutun1Satir1;
    @Column(name = "SUTUN_1_SATIR_2", length = 255) private String sutun1Satir2;
    @Column(name = "SUTUN_1_SATIR_3", length = 255) private String sutun1Satir3;
    @Column(name = "SUTUN_1_SATIR_4", length = 255) private String sutun1Satir4;
    @Column(name = "SUTUN_1_SATIR_5", length = 255) private String sutun1Satir5;
    @Column(name = "SUTUN_1_SATIR_6", length = 255) private String sutun1Satir6;
    @Column(name = "SUTUN_1_SATIR_7", length = 255) private String sutun1Satir7;
    @Column(name = "SUTUN_1_SATIR_8", length = 255) private String sutun1Satir8;
    @Column(name = "SUTUN_1_SATIR_9", length = 255) private String sutun1Satir9;
    @Column(name = "SUTUN_1_SATIR_10", length = 255) private String sutun1Satir10;
    @Column(name = "SUTUN_1_SATIR_11", length = 255) private String sutun1Satir11;

    // Sütun 2 Satırlar
    @Column(name = "SUTUN_2_SATIR_1", length = 255) private String sutun2Satir1;
    @Column(name = "SUTUN_2_SATIR_2", length = 255) private String sutun2Satir2;
    @Column(name = "SUTUN_2_SATIR_3", length = 255) private String sutun2Satir3;
    @Column(name = "SUTUN_2_SATIR_4", length = 255) private String sutun2Satir4;
    @Column(name = "SUTUN_2_SATIR_5", length = 255) private String sutun2Satir5;
    @Column(name = "SUTUN_2_SATIR_6", length = 255) private String sutun2Satir6;
    @Column(name = "SUTUN_2_SATIR_7", length = 255) private String sutun2Satir7;
    @Column(name = "SUTUN_2_SATIR_8", length = 255) private String sutun2Satir8;
    @Column(name = "SUTUN_2_SATIR_9", length = 255) private String sutun2Satir9;
    @Column(name = "SUTUN_2_SATIR_10", length = 255) private String sutun2Satir10;
    @Column(name = "SUTUN_2_SATIR_11", length = 255) private String sutun2Satir11;

    public GeriDonusumDetayliEntity() {}

    public GeriDonusumDetayliEntity(String resimUrl, String detay, String tabloBaslik, String tabloBaslik2, String tabloAdi) {
        this.resimUrl = resimUrl;
        this.detay = detay;
        this.tabloBaslik = tabloBaslik;
        this.tabloBaslik2 = tabloBaslik2;
        this.tabloAdi = tabloAdi;
    }

    // Getter ve Setter metodları
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getResimUrl() { return resimUrl; }
    public void setResimUrl(String resimUrl) { this.resimUrl = resimUrl; }

    public String getDetay() { return detay; }
    public void setDetay(String detay) { this.detay = detay; }

    public String getTabloBaslik() { return tabloBaslik; }
    public void setTabloBaslik(String tabloBaslik) { this.tabloBaslik = tabloBaslik; }

    public String getTabloBaslik2() { return tabloBaslik2; }
    public void setTabloBaslik2(String tabloBaslik2) { this.tabloBaslik2 = tabloBaslik2; }

    public String getTabloAdi() { return tabloAdi; }
    public void setTabloAdi(String tabloAdi) { this.tabloAdi = tabloAdi; }

    public String getSutun1Satir1() { return sutun1Satir1; }
    public void setSutun1Satir1(String sutun1Satir1) { this.sutun1Satir1 = sutun1Satir1; }

    public String getSutun1Satir2() { return sutun1Satir2; }
    public void setSutun1Satir2(String sutun1Satir2) { this.sutun1Satir2 = sutun1Satir2; }

    public String getSutun1Satir3() { return sutun1Satir3; }
    public void setSutun1Satir3(String sutun1Satir3) { this.sutun1Satir3 = sutun1Satir3; }

    public String getSutun1Satir4() { return sutun1Satir4; }
    public void setSutun1Satir4(String sutun1Satir4) { this.sutun1Satir4 = sutun1Satir4; }

    public String getSutun1Satir5() { return sutun1Satir5; }
    public void setSutun1Satir5(String sutun1Satir5) { this.sutun1Satir5 = sutun1Satir5; }

    public String getSutun1Satir6() { return sutun1Satir6; }
    public void setSutun1Satir6(String sutun1Satir6) { this.sutun1Satir6 = sutun1Satir6; }

    public String getSutun1Satir7() { return sutun1Satir7; }
    public void setSutun1Satir7(String sutun1Satir7) { this.sutun1Satir7 = sutun1Satir7; }

    public String getSutun1Satir8() { return sutun1Satir8; }
    public void setSutun1Satir8(String sutun1Satir8) { this.sutun1Satir8 = sutun1Satir8; }

    public String getSutun1Satir9() { return sutun1Satir9; }
    public void setSutun1Satir9(String sutun1Satir9) { this.sutun1Satir9 = sutun1Satir9; }

    public String getSutun1Satir10() { return sutun1Satir10; }
    public void setSutun1Satir10(String sutun1Satir10) { this.sutun1Satir10 = sutun1Satir10; }

    public String getSutun1Satir11() { return sutun1Satir11; }
    public void setSutun1Satir11(String sutun1Satir11) { this.sutun1Satir11 = sutun1Satir11; }

    public String getSutun2Satir1() { return sutun2Satir1; }
    public void setSutun2Satir1(String sutun2Satir1) { this.sutun2Satir1 = sutun2Satir1; }

    public String getSutun2Satir2() { return sutun2Satir2; }
    public void setSutun2Satir2(String sutun2Satir2) { this.sutun2Satir2 = sutun2Satir2; }

    public String getSutun2Satir3() { return sutun2Satir3; }
    public void setSutun2Satir3(String sutun2Satir3) { this.sutun2Satir3 = sutun2Satir3; }

    public String getSutun2Satir4() { return sutun2Satir4; }
    public void setSutun2Satir4(String sutun2Satir4) { this.sutun2Satir4 = sutun2Satir4; }

    public String getSutun2Satir5() { return sutun2Satir5; }
    public void setSutun2Satir5(String sutun2Satir5) { this.sutun2Satir5 = sutun2Satir5; }

    public String getSutun2Satir6() { return sutun2Satir6; }
    public void setSutun2Satir6(String sutun2Satir6) { this.sutun2Satir6 = sutun2Satir6; }

    public String getSutun2Satir7() { return sutun2Satir7; }
    public void setSutun2Satir7(String sutun2Satir7) { this.sutun2Satir7 = sutun2Satir7; }

    public String getSutun2Satir8() { return sutun2Satir8; }
    public void setSutun2Satir8(String sutun2Satir8) { this.sutun2Satir8 = sutun2Satir8; }

    public String getSutun2Satir9() { return sutun2Satir9; }
    public void setSutun2Satir9(String sutun2Satir9) { this.sutun2Satir9 = sutun2Satir9; }

    public String getSutun2Satir10() { return sutun2Satir10; }
    public void setSutun2Satir10(String sutun2Satir10) { this.sutun2Satir10 = sutun2Satir10; }

    public String getSutun2Satir11() { return sutun2Satir11; }
    public void setSutun2Satir11(String sutun2Satir11) { this.sutun2Satir11 = sutun2Satir11; }
}