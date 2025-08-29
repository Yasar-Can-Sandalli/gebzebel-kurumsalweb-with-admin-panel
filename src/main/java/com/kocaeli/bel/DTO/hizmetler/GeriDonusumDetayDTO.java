package com.kocaeli.bel.DTO.hizmetler;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GeriDonusumDetayDTO {
    private Long id;
    private String resim1;
    private String baslik;
    private String detay;
    private String konum;
    private String telefon;
    private String mail;
    private String buttonIcerik;
    private String kategori;
    private String resim2;
    private String resim3;
}