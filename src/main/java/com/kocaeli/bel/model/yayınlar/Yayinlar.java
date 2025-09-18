package com.kocaeli.bel.model.yayınlar;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;


@Entity
@Data
@Table(name = "YAYINLAR")
@ToString(exclude = "yayinCategory")
public class Yayinlar {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "yayinlar_seq_gen")
    @SequenceGenerator(name = "yayinlar_seq_gen", sequenceName = "YAYINLAR_SEQ", allocationSize = 1)
    private Integer yayinId;

    @Column(name = "yayin_baslik",nullable = false, length = 90)
    private String yayinBaslik;

    @Column(name = "yayin_url",nullable = false)
    private String yayinUrl;

    @Column(name = "description")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private YayinlarCategory yayinCategory;
}
