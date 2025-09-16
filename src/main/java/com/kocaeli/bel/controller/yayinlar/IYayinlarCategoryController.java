package com.kocaeli.bel.controller.yayinlar;

import com.kocaeli.bel.model.yayınlar.YayinlarCategory;

public interface IYayinlarCategoryController {

    YayinlarCategory getYayinlarCategoryById(Integer id);
    YayinlarCategory updateYayinlarCategoryById(Integer id, YayinlarCategory yayinlarCategory);
    YayinlarCategory saveYayinlarCategory(YayinlarCategory yayinlarCategory);

}
