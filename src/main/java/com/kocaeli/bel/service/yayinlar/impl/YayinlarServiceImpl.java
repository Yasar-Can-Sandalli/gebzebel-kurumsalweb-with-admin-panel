package com.kocaeli.bel.service.yayinlar.impl;

import com.kocaeli.bel.DTO.yayinlar.CreateYayinRequest;
import com.kocaeli.bel.DTO.yayinlar.YayinlarResponse;
import com.kocaeli.bel.model.yayınlar.Yayinlar;
import com.kocaeli.bel.model.yayınlar.YayinlarCategory;
import com.kocaeli.bel.repository.YayinlarCategoryRepository;
import com.kocaeli.bel.repository.YayinlarRepository;
import com.kocaeli.bel.service.yayinlar.IYayinlarService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@RequiredArgsConstructor
public class YayinlarServiceImpl implements IYayinlarService {

    private final YayinlarRepository yayinlarRepository;
    private final YayinlarCategoryRepository yayinlarCategoryRepository;

    @Override
    public List<YayinlarResponse> getAllYayinlar() {
        return yayinlarRepository.findAll().stream()
                .map(this::toResponse).toList();
    }

    @Transactional(readOnly = true)
    @Override
    public YayinlarResponse getYayinById(Integer id) {
        Yayinlar y = yayinlarRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rapor bulunamadı: " + id));
        return toResponse(y);
    }

    @Transactional
    @Override
    public YayinlarResponse saveYayin(CreateYayinRequest request) {
        YayinlarCategory yc = yayinlarCategoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Kategori bulunamadı: " + request.getCategoryId()));

        Yayinlar y = new Yayinlar();
        y.setYayinBaslik(request.getYayinBaslik());
        y.setYayinUrl(request.getYayinUrl());
        y.setDescription(request.getDescription());
        y.setYayinCategory(yc);

        Yayinlar saved = yayinlarRepository.save(y);
        return toResponse(saved);
    }



    @Transactional
    @Override
    public YayinlarResponse updateYayin(Integer id, CreateYayinRequest request) {

        Yayinlar y = yayinlarRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rapor bulunamadı: " + id));

        if(request.getYayinBaslik() != null) y.setYayinBaslik(request.getYayinBaslik());
        if(request.getYayinUrl() != null) y.setYayinUrl(request.getYayinUrl());
        if(request.getDescription() != null) y.setDescription(request.getDescription());

        if(request.getCategoryId() != null) {
            YayinlarCategory yc = yayinlarCategoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Kategori bulunamadı: " + request.getCategoryId()));
            y.setYayinCategory(yc);
        }

        Yayinlar updated = yayinlarRepository.save(y);

        return toResponse(updated);
    }



    @Transactional
    @Override
    public void deleteYayin(Integer id) {
        Yayinlar y = yayinlarRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rapor bulunamadı: " + id));
        yayinlarRepository.delete(y);
    }



    // --- Helper mapper ---
    private YayinlarResponse toResponse(Yayinlar y) {
        YayinlarCategory yc = y.getYayinCategory();
        return new YayinlarResponse(
                y.getYayinId(),
                y.getYayinBaslik(),
                y.getYayinUrl(),
                y.getDescription(),
                yc != null ? yc.getCategoryId() : null,
                yc != null ? yc.getCategoryName() : null
        );
    }
}
