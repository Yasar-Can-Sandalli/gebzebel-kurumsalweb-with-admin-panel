package com.kocaeli.bel.model.kurumsal;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "MECLIS_KARARLARI_KURUMSAL_KIMLIK_KURUMSAL_RAPORLAR_KURUMSAL_DÖKÜMANLAR")
public class MeclisKarariEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String baslik;

    @Column(name = "dosya_url", nullable = false)
    private String dosyaUrl;

    @Column(nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate tarih;

    @Column(columnDefinition = "integer default 1")
    private int aktif;

    @Column(length = 200)
    private String kategori;

}
