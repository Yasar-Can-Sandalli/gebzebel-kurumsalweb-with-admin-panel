package com.kocaeli.bel.service.raporlar.impl;

import com.kocaeli.bel.DTO.raporlar.CreateRaporRequest;
import com.kocaeli.bel.DTO.raporlar.RaporlarResponse;
import com.kocaeli.bel.model.raporlar.Raporlar;
import com.kocaeli.bel.model.raporlar.RaporlarCategory;
import com.kocaeli.bel.repository.RaporlarCategoryRepository;
import com.kocaeli.bel.repository.RaporlarRepository;
import com.kocaeli.bel.service.raporlar.IRaporlarService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RaporlarServiceImpl implements IRaporlarService {

    private final RaporlarRepository raporlarRepository;
    private final RaporlarCategoryRepository categoryRepository;

    @Transactional(readOnly = true)
    @Override
    public RaporlarResponse getRaporById(Integer id) {
        Raporlar r = raporlarRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rapor bulunamadı: " + id));

        RaporlarCategory c = r.getRaporCategory(); // LAZY ama tx açık
        return new RaporlarResponse(
                r.getRaporId(),
                r.getRaporBaslik(),
                r.getRaporUrl(),
                c.getCategoryId(),
                c.getCategoryName()
        );
    }

    @Transactional
    @Override
    public RaporlarResponse saveRapor(CreateRaporRequest req) {
        RaporlarCategory c = categoryRepository.findById(req.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Kategori bulunamadı: " + req.getCategoryId()));

        Raporlar r = new Raporlar();
        r.setRaporBaslik(req.getRaporBaslik());
        r.setRaporUrl(req.getRaporUrl());
        r.setRaporCategory(c);

        Raporlar saved = raporlarRepository.save(r);

        return new RaporlarResponse(
                saved.getRaporId(),
                saved.getRaporBaslik(),
                saved.getRaporUrl(),
                c.getCategoryId(),
                c.getCategoryName()
        );
    }
}
