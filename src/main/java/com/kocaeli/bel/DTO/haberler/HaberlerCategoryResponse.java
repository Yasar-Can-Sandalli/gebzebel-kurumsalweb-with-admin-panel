package com.kocaeli.bel.DTO.haberler;

import com.kocaeli.bel.DTO.yayinlar.YayinlarSummary;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HaberlerCategoryResponse {
    private Integer categoryId;
    private String categoryName;
    private List<HaberlerSummary> haberler;

}

