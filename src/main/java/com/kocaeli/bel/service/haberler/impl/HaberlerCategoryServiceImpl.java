package com.kocaeli.bel.service.haberler.impl;

import com.kocaeli.bel.DTO.haberler.HaberCategoryDTO;
import com.kocaeli.bel.DTO.haberler.HaberlerCategoryResponse;
import com.kocaeli.bel.DTO.haberler.HaberlerSummary;
import com.kocaeli.bel.model.Haberler.HaberlerCategory;
import com.kocaeli.bel.repository.haberler.HaberlerCategoryRepository;
import com.kocaeli.bel.service.haberler.IHaberlerCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HaberlerCategoryServiceImpl implements IHaberlerCategoryService {


    private final HaberlerCategoryRepository haberlerCategoryRepository;

    @Transactional(readOnly = true)
    @Override
    public HaberlerCategoryResponse getHaberlerCategoryById(Integer categoryId) {

        HaberlerCategory hc = haberlerCategoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Kategori bulunamadı: " + categoryId));

        var haberler = hc.getHaberlerList().stream().map(h -> new HaberlerSummary(
                h.getId(),
                h.getBaslik(),
                h.getTarih(),
                h.getAciklama(),
                h.getResim1(),
                h.getResim2()
        )).collect(Collectors.toList());
        return new HaberlerCategoryResponse(hc.getCategoryId(),hc.getCategoryName(),haberler);
    }

    @Transactional
    @Override
    public HaberlerCategory updateHaberlerCategoryById(Integer categoryId, HaberlerCategory haberlerCategory) {
        HaberlerCategory hc = haberlerCategoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Kategori bulunamadı: " + categoryId));

        hc.setCategoryName(haberlerCategory.getCategoryName());
        return haberlerCategoryRepository.save(hc);
    }


    @Transactional
    @Override
    public HaberlerCategory saveHaberlerCategory(HaberlerCategory haberlerCategory) {
        return haberlerCategoryRepository.save(haberlerCategory);
    }

    @Transactional(readOnly = true)
    @Override
    public List<HaberCategoryDTO> getAllHaberlerCategory() {
        return haberlerCategoryRepository.findAll().stream()
                .map(category -> new HaberCategoryDTO(category.getCategoryId(), category.getCategoryName()))
                .collect(Collectors.toList());
    }
}
