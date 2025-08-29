package com.kocaeli.bel.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import lombok.Data;
import jakarta.persistence.*;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "DUYURULAR")
public class Duyuru {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "BASLIK", length = 300)
    private String baslik;

    @Column(name = "OZET", length = 350)
    private String ozet;

    @Column(name= "TARIH")
    @Temporal(TemporalType.DATE)
    private LocalDate tarih;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "KATEGORI_ID")
    private Kategori kategori;  // Changed from Long kategori_id

    @Column(name="ONEMLI")
    private Short onemli;
}
