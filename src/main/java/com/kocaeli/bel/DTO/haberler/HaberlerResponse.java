package com.kocaeli.bel.DTO.haberler;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HaberlerResponse {

    private Integer haberlerId;
    private String haberBaslik;
    private LocalDate haberTarih;
    private String haberAciklama;
    private String haberResim1;
    private String haberResim2;

    private Integer categoryId;
    private String categoryName;
}
