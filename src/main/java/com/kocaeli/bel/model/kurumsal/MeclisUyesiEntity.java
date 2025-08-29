package com.kocaeli.bel.model.kurumsal;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "KURUMSAL_MECLIS_ESKIBASKANLAR")
public class MeclisUyesiEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "isim_soyisim", nullable = false)
    private String isimSoyisim;
    
    @Column(name = "resim_url", nullable = true)
    private String resimUrl;
    
    @Column(name = "gorev", nullable = true)
    private String gorev;
    
    @Column(name = "sira_no", length = 10, nullable = true)
    private Integer siraNo;
    

}
