package com.kocaeli.bel.service.raporlar.impl;

import com.kocaeli.bel.DTO.raporlar.RaporlarCategoryResponse;
import com.kocaeli.bel.DTO.raporlar.RaporlarSummary;
import com.kocaeli.bel.model.raporlar.RaporlarCategory;
import com.kocaeli.bel.repository.RaporlarCategoryRepository;
import com.kocaeli.bel.service.raporlar.IRaporlarCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RaporlarCategoryServiceImpl implements IRaporlarCategoryService {

    private final RaporlarCategoryRepository raporlarCategoryRepository;

    @Transactional(readOnly = true)
    @Override
    public RaporlarCategoryResponse getRaporlarCategoryById(Integer id) {
        RaporlarCategory c = raporlarCategoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Kategori bulunamadı: " + id));

        var raporlar = c.getRaporlarList().stream()
                .map(r -> new RaporlarSummary(r.getRaporId(), r.getRaporBaslik(), r.getRaporUrl()))
                .collect(Collectors.toList()); // Java 8+ uyumlu

        return new RaporlarCategoryResponse(c.getCategoryId(), c.getCategoryName(), raporlar);
    }

    @Transactional
    @Override
    public RaporlarCategory updateRaporlarCategoryById(Integer id, RaporlarCategory raporlarCategory) {
        RaporlarCategory c = raporlarCategoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Kategori bulunamadı: " + id));
        c.setCategoryName(raporlarCategory.getCategoryName());
        return raporlarCategoryRepository.save(c);
    }

    @Transactional
    @Override
    public RaporlarCategory saveRaporlarCategory(RaporlarCategory raporlarCategory) {
        return raporlarCategoryRepository.save(raporlarCategory);
    }
}
