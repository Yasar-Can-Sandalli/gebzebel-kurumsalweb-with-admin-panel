package com.kocaeli.bel.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="MUDURLUKLER")
@Data
public class Mudurlukler {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Adjust based on your DB sequence strategy
    @Column(name = "ID") // Make sure the column name matches in the DB
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
