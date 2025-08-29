package com.kocaeli.bel.DTO.gebze;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MuhtarlarDTO {
    private Long id;
    private String resimUrl;
    private String ad;
    private String soyad;
    private String mahalle;
    private String telefon;
    private String konum;
    private String eposta;
    private String tamIsim;
    private String mahalleGorev;

    public String getTamIsim() {
        return ad + " " + soyad;
    }


}
