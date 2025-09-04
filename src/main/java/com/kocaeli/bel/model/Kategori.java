package com.kocaeli.bel.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.Entity;
import lombok.Data;
import jakarta.persistence.*;

import java.util.List;

@Data
@Entity
@Table(name = "KATEGORILER")
public class Kategori {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", updatable = false, nullable = false)
    private Long id;

    @Column(name = "AD", length = 255)
    private String ad;

    @JsonIgnore
    @OneToMany(mappedBy = "kategori", cascade = CascadeType.ALL)
    private List<Haberler> haberler;

    @JsonIgnore
    @OneToMany(mappedBy = "kategori", cascade = CascadeType.ALL)
    private List<Duyuru> duyurular;

}
