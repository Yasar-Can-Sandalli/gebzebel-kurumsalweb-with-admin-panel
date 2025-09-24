package com.kocaeli.bel.controller.yayinlar.impl;

import com.kocaeli.bel.DTO.yayinlar.YayinCategoryDto;
import com.kocaeli.bel.DTO.yayinlar.YayinlarCategoryResponse;
import com.kocaeli.bel.controller.yayinlar.IYayinlarCategoryController;
import com.kocaeli.bel.model.yayınlar.YayinlarCategory;
import com.kocaeli.bel.service.yayinlar.IYayinlarCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/yayinlar/category")
@RequiredArgsConstructor
public class YayinlarCategoryControllerImpl implements IYayinlarCategoryController {

    private final IYayinlarCategoryService yayinlarCategoryService;

    @Override
    @GetMapping("/find/{id}")
    public YayinlarCategoryResponse getYayinlarCategoryById(@PathVariable Integer id) {
        return yayinlarCategoryService.getYayinlarCategoryById(id);
    }

    // YENİ ENDPOINT: Yeni DTO'yu döndürür.
    @Override
    @GetMapping("/list")
    public List<YayinCategoryDto> getAllYayinlarCategory() {
        return yayinlarCategoryService.getAllYayinlarCategory();
    }


    @Override
    @PutMapping(path = "/update/{id}")
    public YayinlarCategory updateYayinlarCategoryById(@PathVariable Integer id,
                                                       @RequestBody YayinlarCategory yayinlarCategory) {
        return yayinlarCategoryService.updateYayinlarCategoryById(id, yayinlarCategory);
    }

    @Override
    @PostMapping(path = "/create")
    public YayinlarCategory saveYayinlarCategory(@RequestBody YayinlarCategory yayinlarCategory) {
        return yayinlarCategoryService.saveYayinlarCategory(yayinlarCategory);
    }
}