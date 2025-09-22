package com.kocaeli.bel.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kocaeli.bel.model.Haberler.Haberler;
import jakarta.persistence.Entity;
import lombok.Data;
import jakarta.persistence.*;

import java.util.List;

@Data
@Entity
@Table(name = "KATEGORILER")
public class Kategori {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "AD", length = 255)
    private String ad;

    /*
    @JsonIgnore
    @OneToMany(mappedBy = "kategori", cascade = CascadeType.ALL)
    private List<Haberler> haberler;
     */

    @JsonIgnore
    @OneToMany(mappedBy = "kategori", cascade = CascadeType.ALL)
    private List<Duyuru> duyurular;

}
