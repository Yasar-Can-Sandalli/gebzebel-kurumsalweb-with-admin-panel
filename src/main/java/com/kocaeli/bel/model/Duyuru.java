package com.kocaeli.bel.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import lombok.*;
import jakarta.persistence.*;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "DUYURULAR")
@AllArgsConstructor
@NoArgsConstructor
public class Duyuru {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "duyuru_seq_gen")
    @SequenceGenerator(name = "duyuru_seq_gen", sequenceName = "DUYURULAR_SEQ_GEN", allocationSize = 1)
    private Long id;

    @Column(name = "BASLIK", length = 300)
    private String baslik;

    @Lob
    @Column(name = "OZET", length = 350)
    private String ozet;

    @Column(name= "TARIH")
    @Temporal(TemporalType.DATE)
    private LocalDate tarih;

    @Column(name="ONEMLI")
    private boolean onemli;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "KATEGORI_ID")
    private Kategori kategori;  // Changed from Long kategori_id


    public boolean getOnemli() {
        return onemli;
    }
}
