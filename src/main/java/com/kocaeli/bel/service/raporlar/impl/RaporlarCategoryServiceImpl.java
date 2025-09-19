package com.kocaeli.bel.service.raporlar.impl;

import com.kocaeli.bel.DTO.raporlar.RaporlarCategoryResponse;
import com.kocaeli.bel.DTO.raporlar.RaporlarCategoryResponseBasic;
import com.kocaeli.bel.DTO.raporlar.RaporlarSummary;
import com.kocaeli.bel.model.raporlar.RaporlarCategory;
import com.kocaeli.bel.repository.RaporlarCategoryRepository;
import com.kocaeli.bel.service.raporlar.IRaporlarCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

//YCS
import java.util.ArrayList;
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
                .map(r -> new RaporlarSummary(
                        r.getRaporId(),
                        r.getRaporBaslik(),
                        r.getRaporUrl(),
                        r.getRaporTarihi(),
                       r.isRaporDurum()
                ))
                .collect(Collectors.toList());
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

    @Override
    public List<RaporlarCategoryResponseBasic> getAllRaporlarCategory() {
        List<RaporlarCategoryResponseBasic> categories = new ArrayList<>();

        for (RaporlarCategory r : raporlarCategoryRepository.findAll()){

            RaporlarCategoryResponseBasic responseCategory = new RaporlarCategoryResponseBasic();
            responseCategory.setId(r.getCategoryId());
            responseCategory.setCategoryName(r.getCategoryName());
            categories.add(responseCategory);


        }

        return categories;


    }
}
