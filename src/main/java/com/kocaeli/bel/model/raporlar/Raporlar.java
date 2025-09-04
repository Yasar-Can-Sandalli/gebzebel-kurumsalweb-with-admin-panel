package com.kocaeli.bel.model.raporlar;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "RAPORLAR")
@Getter @Setter
@ToString(exclude = "raporCategory")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Raporlar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Integer raporId;

    @Column(name = "rapor_baslik", nullable = false, length = 30)
    private String raporBaslik;

    @Column(name = "rapor_url", nullable = false)
    private String raporUrl;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private RaporlarCategory raporCategory;
}

