package com.kocaeli.bel.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "ETIKET")
public class Etiket {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "etiket_seq")
    @SequenceGenerator(name = "etiket_seq", sequenceName = "ETIKET_SEQ", allocationSize = 1)
    @Column(name = "ID")
    private Integer id;

    @Column(name = "AD", nullable = false, length = 100)
    private String ad;
}
