package com.kocaeli.bel.model.Haberler;

import com.kocaeli.bel.model.Kategori;
import jakarta.persistence.Entity;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.Data;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;


@Entity
@Getter
@Setter
@Table(name = "HABERLER")
@ToString(exclude = "haberlerCategory")
public class Haberler {

    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "haberler_seq_gen")
    @SequenceGenerator(name = "haberler_seq_gen", sequenceName = "HABERLER_SEQ_GEN", allocationSize = 1)
    @Id
    @Column(name = "ID")
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "BASLIK", length = 300)
    private String baslik;

    @Column(name= "TARIH")
    private LocalDate tarih;

    @Lob
    @Column(name="ACIKLAMA")
    private String aciklama;

    @Column(name = "RESIM1")
    private String resim1;

    @Column(name = "RESIM2")
    private String resim2;


    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "KATEGORI_ID", nullable = false)
    private HaberlerCategory haberCategory;

}
