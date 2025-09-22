package com.kocaeli.bel.controller.yayinlar;

import com.kocaeli.bel.DTO.yayinlar.YayinlarCategoryResponse;
import com.kocaeli.bel.model.yayınlar.YayinlarCategory;

public interface IYayinlarCategoryController {

    YayinlarCategoryResponse getYayinlarCategoryById(Integer id);
    YayinlarCategory updateYayinlarCategoryById(Integer id, YayinlarCategory yayinlarCategory);
    YayinlarCategory saveYayinlarCategory(YayinlarCategory yayinlarCategory);

}
