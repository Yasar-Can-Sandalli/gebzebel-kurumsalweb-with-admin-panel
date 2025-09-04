package com.kocaeli.bel.model.iletisim;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "SIKAYETLER")
public class SikayetEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sikayet_seq")
    @SequenceGenerator(name = "sikayet_seq", sequenceName = "SIKAYET_SEQ", allocationSize = 1)
    private Long id;

    @Column(name = "first_name", length = 100, nullable = false)
    private String firstName;

    @Column(name = "last_name", length = 100, nullable = false)
    private String lastName;

    @Column(length = 100, nullable = false)
    private String email;

    @Column(length = 2000, nullable = false)
    private String description;

    @Column(nullable = false)
    private Boolean resolved;
}
