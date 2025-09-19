package com.kocaeli.bel.controller.raporlar.impl;

import com.kocaeli.bel.DTO.raporlar.RaporlarCategoryResponse;
import com.kocaeli.bel.DTO.raporlar.RaporlarCategoryResponseBasic;
import com.kocaeli.bel.model.raporlar.RaporlarCategory;

import java.util.List;

//YCS
public interface IRaporlarCategoryController {
    RaporlarCategoryResponse getRaporlarCategoryById(Integer id);
    RaporlarCategory updateRaporlarCategoryById(Integer id, RaporlarCategory raporlarCategory);
    RaporlarCategory saveRaporlarCategory(RaporlarCategory raporlarCategory);
    List<RaporlarCategoryResponseBasic> getAllRaporlarCategory();

}
