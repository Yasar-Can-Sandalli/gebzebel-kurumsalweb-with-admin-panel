package com.kocaeli.bel.model;


import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "PROJELER")
public class Projeler {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "BASLIK", length = 300)
    private String Baslik;

    @Column(name = "RESIM_URL" , length = 555)
    private String ResimUrl;

    @Column(name = "DURUMU")
    private String Durumu;

}
