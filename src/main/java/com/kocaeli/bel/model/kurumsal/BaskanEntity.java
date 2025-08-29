package com.kocaeli.bel.model.kurumsal;
import jakarta.persistence.*;

@Entity
@Table(name = "kurumsal_baskan_misyon_vizyon_ilkelerimiz")
public class BaskanEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "resim_url1")
    private String resimUrl1;

    @Column(name = "image_url2")
    private String imageUrl2;

    @Lob
    @Column(name = "icerik")
    private String icerik;

    @Column(name = "delta")
    private Integer delta;

    @Column(name = "kategori")
    private String kategori;

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getDelta() {
        return delta;
    }

    public void setDelta(Integer delta) {
        this.delta = delta;
    }

    public String getResimUrl1() {
        return resimUrl1;
    }

    public void setResimUrl1(String resimUrl1) {
        this.resimUrl1 = resimUrl1;
    }

    public String getImageUrl2() {
        return imageUrl2;
    }

    public void setImageUrl2(String imageUrl2) {
        this.imageUrl2 = imageUrl2;
    }

    public String getIcerik() {
        return icerik;
    }

    public void setIcerik(String icerik) {
        this.icerik = icerik;
    }

    public String getKategori() {
        return kategori;
    }

    public void setKategori(String kategori) {
        this.kategori = kategori;
    }
}