package com.kocaeli.bel.service.haberler;

import com.kocaeli.bel.DTO.haberler.HaberCategoryDTO;
import com.kocaeli.bel.DTO.haberler.HaberlerCategoryResponse;
import com.kocaeli.bel.model.Haberler.HaberlerCategory;

import java.util.List;

public interface IHaberlerCategoryService {

    HaberlerCategoryResponse getHaberlerCategoryById(Integer categoryId);

    HaberlerCategory updateHaberlerCategoryById(Integer categoryId, HaberlerCategory haberlerCategory);

    HaberlerCategory saveHaberlerCategory(HaberlerCategory haberlerCategory);

    List<HaberCategoryDTO> getAllHaberlerCategory();
}

