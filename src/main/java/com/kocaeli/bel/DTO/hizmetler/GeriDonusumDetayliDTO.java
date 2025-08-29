package com.kocaeli.bel.DTO.hizmetler;
import java.util.List;
import java.util.ArrayList;
public class GeriDonusumDetayliDTO {
    private Long id;
    private String resimUrl;
    private String detay;
    private String tabloBaslik;
    private String tabloBaslik2;
    private String tabloAdi;
    private List<String> sutun1Satirlar;
    private List<String> sutun2Satirlar;

    // Constructors
    public GeriDonusumDetayliDTO() {
        this.sutun1Satirlar = new ArrayList<>();
        this.sutun2Satirlar = new ArrayList<>();
    }

    public GeriDonusumDetayliDTO(Long id, String resimUrl, String detay, String tabloBaslik,
                                 String tabloBaslik2, String tabloAdi) {
        this.id = id;
        this.resimUrl = resimUrl;
        this.detay = detay;
        this.tabloBaslik = tabloBaslik;
        this.tabloBaslik2 = tabloBaslik2;
        this.tabloAdi = tabloAdi;
        this.sutun1Satirlar = new ArrayList<>();
        this.sutun2Satirlar = new ArrayList<>();
    }

    // Nested class for table data structure
    public static class TabloVerisi {
        private String tabloBaslik;
        private String tabloBaslik2;
        private String tabloAdi;
        private List<SatirVerisi> satirlar;

        public TabloVerisi() {
            this.satirlar = new ArrayList<>();
        }

        // Getters and Setters
        public String getTabloBaslik() {
            return tabloBaslik;
        }

        public void setTabloBaslik(String tabloBaslik) {
            this.tabloBaslik = tabloBaslik;
        }

        public String getTabloBaslik2() {
            return tabloBaslik2;
        }

        public void setTabloBaslik2(String tabloBaslik2) {
            this.tabloBaslik2 = tabloBaslik2;
        }

        public String getTabloAdi() {
            return tabloAdi;
        }

        public void setTabloAdi(String tabloAdi) {
            this.tabloAdi = tabloAdi;
        }

        public List<SatirVerisi> getSatirlar() {
            return satirlar;
        }

        public void setSatirlar(List<SatirVerisi> satirlar) {
            this.satirlar = satirlar;
        }
    }

    public static class SatirVerisi {
        private String sutun1;
        private String sutun2;

        public SatirVerisi() {}

        public SatirVerisi(String sutun1, String sutun2) {
            this.sutun1 = sutun1;
            this.sutun2 = sutun2;
        }

        // Getters and Setters
        public String getSutun1() {
            return sutun1;
        }

        public void setSutun1(String sutun1) {
            this.sutun1 = sutun1;
        }

        public String getSutun2() {
            return sutun2;
        }

        public void setSutun2(String sutun2) {
            this.sutun2 = sutun2;
        }
    }

    // Method to get structured table data
    public TabloVerisi getTabloVerisi() {
        TabloVerisi tabloVerisi = new TabloVerisi();
        tabloVerisi.setTabloBaslik(this.tabloBaslik);
        tabloVerisi.setTabloBaslik2(this.tabloBaslik2);
        tabloVerisi.setTabloAdi(this.tabloAdi);

        List<SatirVerisi> satirlar = new ArrayList<>();
        int maxSize = Math.max(sutun1Satirlar.size(), sutun2Satirlar.size());

        for (int i = 0; i < maxSize; i++) {
            String sutun1Deger = i < sutun1Satirlar.size() ? sutun1Satirlar.get(i) : null;
            String sutun2Deger = i < sutun2Satirlar.size() ? sutun2Satirlar.get(i) : null;

            if (sutun1Deger != null || sutun2Deger != null) {
                satirlar.add(new SatirVerisi(sutun1Deger, sutun2Deger));
            }
        }

        tabloVerisi.setSatirlar(satirlar);
        return tabloVerisi;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getResimUrl() {
        return resimUrl;
    }

    public void setResimUrl(String resimUrl) {
        this.resimUrl = resimUrl;
    }

    public String getDetay() {
        return detay;
    }

    public void setDetay(String detay) {
        this.detay = detay;
    }

    public String getTabloBaslik() {
        return tabloBaslik;
    }

    public void setTabloBaslik(String tabloBaslik) {
        this.tabloBaslik = tabloBaslik;
    }

    public String getTabloBaslik2() {
        return tabloBaslik2;
    }

    public void setTabloBaslik2(String tabloBaslik2) {
        this.tabloBaslik2 = tabloBaslik2;
    }

    public String getTabloAdi() {
        return tabloAdi;
    }

    public void setTabloAdi(String tabloAdi) {
        this.tabloAdi = tabloAdi;
    }

    public List<String> getSutun1Satirlar() {
        return sutun1Satirlar;
    }

    public void setSutun1Satirlar(List<String> sutun1Satirlar) {
        this.sutun1Satirlar = sutun1Satirlar;
    }

    public List<String> getSutun2Satirlar() {
        return sutun2Satirlar;
    }

    public void setSutun2Satirlar(List<String> sutun2Satirlar) {
        this.sutun2Satirlar = sutun2Satirlar;
    }
}
