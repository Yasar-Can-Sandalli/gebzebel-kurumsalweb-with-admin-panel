package com.kocaeli.bel.DTO.gebze;

import lombok.Data;
import java.time.LocalDate;

    @Data
    public class HaberlerDto {
        private String baslik;
        private LocalDate tarih;
        private String aciklama;
        private String resim1;
        private String resim2;
        private Long kategoriId;
    }
