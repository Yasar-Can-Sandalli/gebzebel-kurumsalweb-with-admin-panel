package com.kocaeli.bel.DTO.raporlar;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RaporlarCategoryResponse {
    private Integer categoryId;
    private String categoryName;
    private List<RaporlarSummary> raporlar;
}
