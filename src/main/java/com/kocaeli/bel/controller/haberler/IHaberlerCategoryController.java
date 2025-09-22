package com.kocaeli.bel.controller.haberler;

import com.kocaeli.bel.DTO.haberler.HaberCategoryDTO;
import com.kocaeli.bel.DTO.haberler.HaberlerCategoryResponse;
import com.kocaeli.bel.model.Haberler.Haberler;
import com.kocaeli.bel.model.Haberler.HaberlerCategory;

import java.util.List;

//IG
public interface IHaberlerCategoryController {

    HaberlerCategoryResponse getHaberlerCategoryById(Integer id);

    // YENİ ENDPOINT: Yeni DTO'yu döndürür.
    List<HaberCategoryDTO> getAllHaberlerCategory();


    HaberlerCategory updateHaberlerCategoryById(Integer id, HaberlerCategory haberlerCategory);

    HaberlerCategory saveHaberlerCategory(HaberlerCategory haberlerCategory);



}
