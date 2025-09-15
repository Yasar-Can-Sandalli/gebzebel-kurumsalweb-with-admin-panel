package com.kocaeli.bel.model.raporlar;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.EqualsAndHashCode;

import java.util.Date;

//YCS
@Entity
@Table(name = "RAPORLAR")
@Getter @Setter
@ToString(exclude = "raporCategory")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Raporlar {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "raporlar_seq_gen")
    @SequenceGenerator(name = "raporlar_seq_gen", sequenceName = "RAPORLAR_SEQ", allocationSize = 1)
    private Integer raporId;

    @Column(name = "rapor_baslik", nullable = false, length = 30)
    private String raporBaslik;

    @Column(name = "rapor_url", nullable = false)
    private String raporUrl;

    @Column(name = "rapor_tarihi")
    private Date raporTarihi;

    @Column(name = "rapor_durum")
    private boolean raporDurum;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private RaporlarCategory raporCategory;
}

