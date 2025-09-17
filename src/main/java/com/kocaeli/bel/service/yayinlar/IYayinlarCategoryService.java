package com.kocaeli.bel.service.yayinlar;


import com.kocaeli.bel.DTO.yayinlar.YayinCategoryDto;
import com.kocaeli.bel.DTO.yayinlar.YayinlarCategoryResponse;
import com.kocaeli.bel.DTO.yayinlar.YayinlarResponse;
import com.kocaeli.bel.model.yayınlar.YayinlarCategory;

import java.util.List;

public interface IYayinlarCategoryService {

    YayinlarCategoryResponse getYayinlarCategoryById(Integer id);

    YayinlarCategory updateYayinlarCategoryById(Integer id, YayinlarCategory yayinlarCategory);

    YayinlarCategory saveYayinlarCategory(YayinlarCategory yayinlarCategory);
    // YENİ METOT: Sadece kategori listesini döndürür.
    List<YayinCategoryDto> getAllYayinlarCategory();
}
