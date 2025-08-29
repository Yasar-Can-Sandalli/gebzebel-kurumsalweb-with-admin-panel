package com.kocaeli.bel.model.hizmetler;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "HIZMETLER_DETAYLI_BILGI")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GeriDonusumDetayeEnitity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "RESIM1", length = 255)
    private String resim1;

    @Column(name = "BASLIK", length = 255)
    private String baslik;

    @Lob
    @Column(name = "DETAY")
    private String detay;

    @Column(name = "KONUM", length = 255)
    private String konum;

    @Column(name = "TELEFON", length = 255)
    private String telefon;

    @Column(name = "MAIL", length = 255)
    private String mail;

    @Column(name = "BUTTON_ICERIK", length = 255)
    private String buttonIcerik;

    @Column(name = "KATEGORI", length = 255)
    private String kategori;

    @Column(name = "RESIM2", length = 255)
    private String resim2;

    @Column(name = "RESIM", length = 255)
    private String resim3;
}