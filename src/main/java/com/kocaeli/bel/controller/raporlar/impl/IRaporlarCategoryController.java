package com.kocaeli.bel.controller.raporlar.impl;

import com.kocaeli.bel.model.raporlar.RaporlarCategory;
//YCS
public interface IRaporlarCategoryController {
    RaporlarCategory getRaporlarCategoryById(Integer id);
    RaporlarCategory updateRaporlarCategoryById(Integer id, RaporlarCategory raporlarCategory);
    RaporlarCategory saveRaporlarCategory(RaporlarCategory raporlarCategory);

}
