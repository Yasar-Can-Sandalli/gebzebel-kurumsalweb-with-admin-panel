package com.kocaeli.bel.controller.yayinlar.impl;

import com.kocaeli.bel.DTO.yayinlar.YayinlarCategoryResponse;
import com.kocaeli.bel.model.yayınlar.YayinlarCategory;
import com.kocaeli.bel.service.yayinlar.IYayinlarCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/yayinlar/category")
@RequiredArgsConstructor
public class YayinlarCategoryControllerImpl {

    private final IYayinlarCategoryService yayinlarCategoryService;

    @GetMapping("/find/{id}")
    public YayinlarCategoryResponse getYayinlarCategoryById(@PathVariable Integer id) {
        return yayinlarCategoryService.getYayinlarCategoryById(id);
    }

    @PutMapping("/update/{id}")
    public YayinlarCategory updateYayinlarCategoryById(@PathVariable Integer id,
                                                       @RequestBody YayinlarCategory yayinlarCategory) {
        return yayinlarCategoryService.updateYayinlarCategoryById(id, yayinlarCategory);
    }

    @PostMapping("/create")
    public YayinlarCategory saveYayinlarCategory(@RequestBody YayinlarCategory yayinlarCategory) {
        return yayinlarCategoryService.saveYayinlarCategory(yayinlarCategory);
    }
}