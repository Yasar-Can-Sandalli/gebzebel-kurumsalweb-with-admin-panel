package com.kocaeli.bel.model.kurumsal;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "kurumsal_yonetim_semasi")
public class YonetimSemasiEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "yonetimSemasiSeq")
    @SequenceGenerator(name = "yonetimSemasiSeq", sequenceName = "YONETIM_SEMASI_SEQ", allocationSize = 1)
    private Long id;
    
    @Column(name = "isim_soyisim", nullable = false)
    private String isimSoyisim;
    
    @Column(name = "resim_url", nullable = true)
    private String resimUrl;
    
    @Column(name = "pozisyon", nullable = false)
    private String pozisyon;
    
    @Column(name = "sira_no", nullable = true)
    private Integer siraNo;
    
    @Lob
    @Column(name = "mudurlukler", nullable = true)
    private String mudurlukler;

    @Column(name = "delta", nullable = true)
    private Integer delta = 1;

    // Eklenen alanlar
    @Column(name = "email", nullable = true)
    private String email;
    
    @Column(name = "telefon", nullable = true)
    private String telefon;

    @Lob
    @Column(name = "biyografi", nullable = true)
    private String biyografi;
    
   }
