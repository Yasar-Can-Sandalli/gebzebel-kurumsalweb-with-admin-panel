package com.kocaeli.bel.controller.haberler.impl;

import com.kocaeli.bel.DTO.haberler.HaberCategoryDTO;
import com.kocaeli.bel.DTO.haberler.HaberlerCategoryResponse;
import com.kocaeli.bel.controller.haberler.IHaberlerCategoryController;
import com.kocaeli.bel.model.Haberler.HaberlerCategory;
import com.kocaeli.bel.service.haberler.IHaberlerCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/haberler/category")
@RequiredArgsConstructor
public class HaberlerCategoryControllerImpl implements IHaberlerCategoryController {

    private final IHaberlerCategoryService haberlerCategoryService;

    @GetMapping("/find/{id}")
    @Override
    public HaberlerCategoryResponse getHaberlerCategoryById(@PathVariable Integer id) {
        return haberlerCategoryService.getHaberlerCategoryById(id);
    }

    @GetMapping("/list")
    @Override
    public List<HaberCategoryDTO> getAllHaberlerCategory() {
        return haberlerCategoryService.getAllHaberlerCategory();
    }


    @PutMapping("/update/{id}")
    @Override
    public HaberlerCategory updateHaberlerCategoryById(@PathVariable Integer id,
                                                       @RequestBody HaberlerCategory haberlerCategory) {
        return haberlerCategoryService.updateHaberlerCategoryById(id, haberlerCategory);
    }

    @PostMapping("/create")
    @Override
    public HaberlerCategory saveHaberlerCategory(@RequestBody HaberlerCategory haberlerCategory) {
        return haberlerCategoryService.saveHaberlerCategory(haberlerCategory);
    }


}
