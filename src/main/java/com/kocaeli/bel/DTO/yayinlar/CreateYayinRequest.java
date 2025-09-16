package com.kocaeli.bel.DTO.yayinlar;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateYayinRequest {

    private String yayinBaslik;
    private String yayinUrl;
    private String description;
    private Integer categoryId;
}
