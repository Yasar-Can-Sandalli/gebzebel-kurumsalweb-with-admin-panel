package com.kocaeli.bel.model.gebze;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "GEBZE_UYE_OLDUGUMUZ_BIRLIKLER")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UyeOldugumuzBirlikler {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID")
    private Long id;

    @Column(name = "LOGO_URL", nullable = false)
    private String logoUrl;

    @Column(name = "BAŞLIK", nullable = false)
    private String baslik;

    @Column(name = "URL", nullable = false)
    private String url;
}