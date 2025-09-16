package com.kocaeli.bel.DTO.yayinlar;

import com.kocaeli.bel.model.yayınlar.YayinlarCategory;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class YayinlarSummary {


    private Integer yayinId;
    private String yayinBaslik;
    private String yayinUrl;
    private String description;

}
