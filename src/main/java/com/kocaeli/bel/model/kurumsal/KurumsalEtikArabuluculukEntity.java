package com.kocaeli.bel.model.kurumsal;

import jakarta.persistence.*;

@Entity
@Table(name = "KURUMSAL_ETIK_ARABULUCULUK")
public class KurumsalEtikArabuluculukEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "AD")
    private String ad;

    @Column(name = "UNVAN")
    private String unvan;

    @Column(name = "GOREV")
    private String gorev;

    @Column(name = "TIP", nullable = false)
    private String tip; // "etik", "arabuluculuk", "etik_ilke"

    @Column(name = "IMG_URL")
    private String imgUrl;

    @Column(name = "ILKE")
    private String ilke;

    // Getter ve Setter'lar
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getAd() { return ad; }
    public void setAd(String ad) { this.ad = ad; }

    public String getUnvan() { return unvan; }
    public void setUnvan(String unvan) { this.unvan = unvan; }

    public String getGorev() { return gorev; }
    public void setGorev(String gorev) { this.gorev = gorev; }

    public String getTip() { return tip; }
    public void setTip(String tip) { this.tip = tip; }

    public String getImgUrl() { return imgUrl; }
    public void setImgUrl(String imgUrl) { this.imgUrl = imgUrl; }

    public String getIlke() { return ilke; }
    public void setIlke(String ilke) { this.ilke = ilke; }
}
