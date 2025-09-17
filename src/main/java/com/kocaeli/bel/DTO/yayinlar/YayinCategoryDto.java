package com.kocaeli.bel.DTO.yayinlar;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class YayinCategoryDto {
    private Integer categoryId;
    private String categoryName;
}
