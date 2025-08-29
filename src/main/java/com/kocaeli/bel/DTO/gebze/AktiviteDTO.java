package com.kocaeli.bel.DTO.gebze;

import lombok.Data;

@Data
public class AktiviteDTO {
    private String baslik;
    private String aciklama;

    public AktiviteDTO(String baslik, String aciklama) {
        this.baslik = baslik;
        this.aciklama = aciklama;
    }
}
