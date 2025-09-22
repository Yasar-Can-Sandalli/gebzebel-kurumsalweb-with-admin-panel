package com.kocaeli.bel.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="MUDURLUKLER")
@Data
public class Mudurlukler {

    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "mudurlukler_seq_gen")
    @SequenceGenerator(name = "mudurlukler_seq_gen", sequenceName = "MUDURLUKLER_SEQ_GEN", allocationSize = 1)
    @Id
    @Column(name = "ID")
    private Long id;

    @Column(name = "MUDURLUKISIM", nullable = false) // Department name
    private String name;

    @Column(name = "AD") // Manager name
    private String managerName;

    @Column(name = "EMAIL") // Email of the department
    private String email;

    @Column(name = "IMG_URL")
    private String imageUrl;

    @Lob
    @Column(name="MUDURLUK_ACIKLAMASI")
    private String mudAciklamasi;

    @Lob
    @Column(name="REGULATIONS")
    private String regulations;

    @Lob
    @Column(name="BIOGRAPHY")
    private String biography;


}
