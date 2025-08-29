package com.kocaeli.bel.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "KULLANICILAR")
public class User {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    public User(Long id, String TCNo, String password) {
        this.id = id;
        this.TCNo = TCNo;
        this.password = password;
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