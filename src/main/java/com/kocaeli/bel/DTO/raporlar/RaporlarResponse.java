package com.kocaeli.bel.DTO.raporlar;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

//YCS
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RaporlarResponse {
    private Integer raporId;
    private String raporBaslik;
    private String raporUrl;
    private Integer categoryId;
    private String categoryName;
    private Date raporTarihi;
    private Boolean raporDurum;
}
