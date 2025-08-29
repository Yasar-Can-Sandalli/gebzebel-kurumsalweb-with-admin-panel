package com.kocaeli.bel.DTO.gebze;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UyeOldugumuzBirliklerDTO {
    private Long id;
    private String logo;  // logoUrl
    private String baslik;  // title
    private String url;  // url
}
