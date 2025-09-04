package com.kocaeli.bel.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import lombok.Data;
import jakarta.persistence.*;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "HABERLER")
public class Haberler {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "BASLIK", length = 300, nullable = false)
    private String baslik;

    @Column(name= "TARIH", nullable = false)
    private LocalDate tarih;

    @Lob
    @Column(name="ACIKLAMA")
    private String aciklama;

    @Column(name = "RESIM1")
    private String resim1;

    @Column(name = "RESIM2")
    private String resim2;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "KATEGORI_ID", nullable = true)
    private Kategori kategori;


}