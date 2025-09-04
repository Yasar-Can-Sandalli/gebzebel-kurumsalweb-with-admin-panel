// service/raporlar/IRaporlarCategoryService.java
package com.kocaeli.bel.service.raporlar;


import com.kocaeli.bel.DTO.raporlar.RaporlarCategoryResponse;
import com.kocaeli.bel.model.raporlar.RaporlarCategory;

public interface IRaporlarCategoryService {
    RaporlarCategoryResponse getRaporlarCategoryById(Integer id);

    // İstersen entity ile create/update bırakabilirsin:
    RaporlarCategory updateRaporlarCategoryById(Integer id, RaporlarCategory raporlarCategory);
    RaporlarCategory saveRaporlarCategory(RaporlarCategory raporlarCategory);
}