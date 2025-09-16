package com.kocaeli.bel.DTO.yayinlar;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class YayinlarCategoryResponse {

    private Integer categoryId;
    private String categoryName;
    private List<YayinlarSummary> yayinlar;
}
