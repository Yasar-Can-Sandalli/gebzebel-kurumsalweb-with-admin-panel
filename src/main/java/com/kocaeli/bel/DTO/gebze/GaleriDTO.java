package com.kocaeli.bel.DTO.gebze;

import lombok.Data;

@Data
public class GaleriDTO {
    private String path;
    private String alt;

    public GaleriDTO(String path, String alt) {
        this.path = path;
        this.alt = alt;
    }
}

