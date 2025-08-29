package com.kocaeli.bel.model.gebze;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "GEBZE_TARIHCE_BUGUNKUGEBZE")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TarihceEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "RESIM1", length = 100)
    private String resim1;

    @Column(name = "RESIM2", length = 100)
    private String resim2;

    @Column(name = "RESIM3", length = 100)
    private String resim3;

    @Column(name = "RESIM4", length = 100)
    private String resim4;

    @Column(name = "RESIM5", length = 100)
    private String resim5;

    @Column(name = "RESIM6", length = 100)
    private String resim6;

    @Column(name = "RESIM7", length = 100)
    private String resim7;

    @Column(name = "RESIM8", length = 100)
    private String resim8;

    @Column(name = "RESIM9", length = 100)
    private String resim9;

    @Column(name = "RESIM10", length = 100)
    private String resim10;

    @Column(name = "ACIKLAMA", columnDefinition = "CLOB")
    private String aciklama;

    @Column(name = "NUFUS1")
    private String nufus1;

    @Column(name = "NUFUS2")
    private String nufus2;

    @Column(name = "NUFUS3")
    private String nufus3;

    @Column(name = "NUFUS4")
    private String nufus4;

    @Column(name = "NUFUS5")
    private String nufus5;

    @Column(name = "YIL1")
    private Integer yil1;

    @Column(name = "YIL2")
    private Integer yil2;

    @Column(name = "YIL3")
    private Integer yil3;

    @Column(name = "YIL4")
    private Integer yil4;

    @Column(name = "YIL5")
    private Integer yil5;

    @Column(name = "TYPE", length = 20)
    private String type; // "TARIHCE" veya "BUGUNKU_GEBZE"
}