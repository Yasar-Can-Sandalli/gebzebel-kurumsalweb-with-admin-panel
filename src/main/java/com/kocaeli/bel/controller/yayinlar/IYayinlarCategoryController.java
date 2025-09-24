package com.kocaeli.bel.controller.yayinlar;

import com.kocaeli.bel.DTO.yayinlar.YayinCategoryDto;
import com.kocaeli.bel.DTO.yayinlar.YayinlarCategoryResponse;
import com.kocaeli.bel.model.yayınlar.YayinlarCategory;

import java.util.List;

public interface IYayinlarCategoryController {


    YayinlarCategoryResponse getYayinlarCategoryById(Integer id);
    List<YayinCategoryDto> getAllYayinlarCategory();
    YayinlarCategory updateYayinlarCategoryById(Integer id, YayinlarCategory yayinlarCategory);
    YayinlarCategory saveYayinlarCategory(YayinlarCategory yayinlarCategory);

}
