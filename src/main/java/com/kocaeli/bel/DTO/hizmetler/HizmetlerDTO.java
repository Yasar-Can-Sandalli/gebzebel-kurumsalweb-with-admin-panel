package com.kocaeli.bel.DTO.hizmetler;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HizmetlerDTO {
    private Long id;
    private String baslik;
    private String imgUrl;
    private String telefon;
    private String konum;
    private String buttonDetay;
    private String buttonKonum;
    private String mail;
    private String kategori;
}
