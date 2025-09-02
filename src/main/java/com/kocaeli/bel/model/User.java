package com.kocaeli.bel.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "KULLANICILAR")
public class User {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq_gen")
    @SequenceGenerator(name = "user_seq_gen", sequenceName = "KULLANICILAR_SEQ", allocationSize = 1)
    private Long id;

    @Column(name = "TCNO", unique = true)
    private String TCNo;

    @Column(name = "ISIM")
    private String isim;

    @Column(name = "PASSWORD")
    private String password;

    @Column(name = "STATUS")
    private String status;

    @Column(columnDefinition = "json")
    private String yetkilerJson;

    // Default constructor
    public User() {
    }

    // Constructor with basic fields
    public User(String TCNo, String password) {
        this.TCNo = TCNo;
        this.password = password;
    }

    // Constructor with ID
    public User(Long id, String TCNo, String isim, String password, String status, String yetkilerJson) {
        this.id = id;
        this.TCNo = TCNo;
        this.isim = isim;
        this.password = password;
        this.status = status;
        this.yetkilerJson = yetkilerJson;
    }

    // Copy constructor - FIXED
    public User(User user) {
        if (user != null) {
            this.id = user.id;
            this.TCNo = user.TCNo;
            this.isim = user.isim;
            this.password = user.password;
            this.status = user.status;
            this.yetkilerJson = user.yetkilerJson;
        }
    }
}