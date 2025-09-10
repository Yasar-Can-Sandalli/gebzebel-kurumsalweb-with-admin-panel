package com.kocaeli.bel.DTO.hizmetler;

import lombok.Data;

@Data
public class HaberlerDTO {
    private String baslik;
    private String aciklama;
    private String resim1;
    private String resim2;
    private String tarih;     // "2025-09-26" (tercih) veya "26.09.2025"
    private Long kategoriId;
}
