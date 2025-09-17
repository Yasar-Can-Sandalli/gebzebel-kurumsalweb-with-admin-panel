package com.kocaeli.bel.DTO.yayinlar;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class YayinlarResponse {

    private Integer yayinId;
    private String yayinBaslik;
    private String yayinUrl;
    private String description;
    private Integer categoryId;
    private String categoryName;


}
