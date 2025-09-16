package com.kocaeli.bel.service.yayinlar.impl;

import com.kocaeli.bel.DTO.yayinlar.YayinlarCategoryResponse;
import com.kocaeli.bel.DTO.yayinlar.YayinlarSummary;
import com.kocaeli.bel.model.yayınlar.YayinlarCategory;
import com.kocaeli.bel.repository.YayinlarCategoryRepository;
import com.kocaeli.bel.service.yayinlar.IYayinlarCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class YayinlarCategoryServiceImpl implements IYayinlarCategoryService {

    private final YayinlarCategoryRepository yayinlarCategoryRepository;


    @Transactional(readOnly = true)
    @Override
    public YayinlarCategoryResponse getYayinlarCategoryById(Integer id) {

        YayinlarCategory yc = yayinlarCategoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Kategori bulunamadı: " + id));

        var yayinlar = yc.getYayinlarList().stream().map(y -> new YayinlarSummary(
                        y.getYayinId(),
                        y.getYayinBaslik(),
                        y.getYayinUrl(),
                        y.getDescription()
                )).collect(Collectors.toList());
        return new YayinlarCategoryResponse(yc.getCategoryId(), yc.getCategoryName(), yayinlar);
    }


    @Transactional
    @Override
    public YayinlarCategory updateYayinlarCategoryById(Integer id, YayinlarCategory yayinlarCategory) {
        YayinlarCategory yc = yayinlarCategoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Kategori bulunamadı: " + id));

        yc.setCategoryName(yayinlarCategory.getCategoryName());
        return yayinlarCategoryRepository.save(yc);
    }


    @Transactional
    @Override
    public YayinlarCategory saveYayinlarCategory(YayinlarCategory yayinlarCategory) {
        return yayinlarCategoryRepository.save(yayinlarCategory);
    }


}
