package com.kocaeli.bel.controller.raporlar.impl;


import com.kocaeli.bel.DTO.raporlar.RaporlarCategoryResponse;
import com.kocaeli.bel.DTO.raporlar.RaporlarCategoryResponseBasic;
import com.kocaeli.bel.controller.raporlar.IRaporlarCategoryController;
import com.kocaeli.bel.model.raporlar.RaporlarCategory;
import com.kocaeli.bel.service.raporlar.IRaporlarCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//YCS
@RestController
@RequestMapping("/api/raporlar/category")
@RequiredArgsConstructor
public class RaporlarCategoryControllerImpl implements IRaporlarCategoryController {

    private final IRaporlarCategoryService raporlarCategoryService;

    @GetMapping("/find/{id}")
    public RaporlarCategoryResponse getRaporlarCategoryById(@PathVariable Integer id) {
        return raporlarCategoryService.getRaporlarCategoryById(id);
    }

    @PutMapping("/update/{id}")
    public RaporlarCategory updateRaporlarCategoryById(@PathVariable Integer id,
                                                       @RequestBody RaporlarCategory raporlarCategory) {
        return raporlarCategoryService.updateRaporlarCategoryById(id, raporlarCategory);
    }

    @PostMapping("/create")
    public RaporlarCategory saveRaporlarCategory(@RequestBody RaporlarCategory raporlarCategory) {
        return raporlarCategoryService.saveRaporlarCategory(raporlarCategory);
    }

    @Override
    @GetMapping("/list")
    public List<RaporlarCategoryResponseBasic> getAllRaporlarCategory() {
        return raporlarCategoryService.getAllRaporlarCategory();
    }
}
