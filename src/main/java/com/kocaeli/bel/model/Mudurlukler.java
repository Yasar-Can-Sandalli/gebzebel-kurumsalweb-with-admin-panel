package com.kocaeli.bel.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

@Entity
@Table(name="MUDURLUKLER")
public class Mudurlukler {

    @Getter
    @jakarta.persistence.Id
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Adjust based on your DB sequence strategy
    @Column(name = "ID") // Make sure the column name matches in the DB
    private Long id;

    @Getter
    @Column(name = "MUDURLUKISIM", nullable = false) // Department name
    private String name;

    @Getter
    @Column(name = "AD") // Manager name
    private String managerName;

    @Getter
    @Column(name = "EMAIL") // Email of the department
    private String email;

    @Getter
    @Column(name = "IMG_URL") // Image URL of the department
    private String imageUrl;

    @Getter
    @Lob
    @Column(name="MUDURLUK_ACIKLAMASI")
    private String mudAciklamasi;

    @Getter
    @Lob
    @Column(name="REGULATIONS")
    private String regulations;

    @Getter
    @Lob
    @Column(name="BIOGRAPHY")
    private String biography;


}
