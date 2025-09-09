package com.kocaeli.bel.service.raporlar.impl;

import com.kocaeli.bel.DTO.raporlar.CreateRaporRequest;
import com.kocaeli.bel.DTO.raporlar.RaporlarResponse;
import com.kocaeli.bel.model.raporlar.Raporlar;
import com.kocaeli.bel.model.raporlar.RaporlarCategory;
import com.kocaeli.bel.repository.RaporlarCategoryRepository;
import com.kocaeli.bel.repository.RaporlarRepository;
import com.kocaeli.bel.service.raporlar.IRaporlarService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
//YCS
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
        return toResponse(r);
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
        r.setRaporTarihi(req.getRaporTarihi());
        r.setRaporDurum(Boolean.TRUE.equals(req.getRaporDurum()));

        Raporlar saved = raporlarRepository.save(r);
        return toResponse(saved);
    }


    @Transactional
    @Override
    public RaporlarResponse updateRapor(Integer id, CreateRaporRequest req) {
        Raporlar r = raporlarRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rapor bulunamadı: " + id));

        // Alanları güncelle (null gelenleri es geçiyoruz)
        if (req.getRaporBaslik() != null) r.setRaporBaslik(req.getRaporBaslik());
        if (req.getRaporUrl() != null)    r.setRaporUrl(req.getRaporUrl());
        if (req.getRaporTarihi() != null) r.setRaporTarihi(req.getRaporTarihi());
        if (req.getRaporDurum() != null)  r.setRaporDurum(req.getRaporDurum());

        if (req.getCategoryId() != null) {
            RaporlarCategory c = categoryRepository.findById(req.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Kategori bulunamadı: " + req.getCategoryId()));
            r.setRaporCategory(c);
        }

        Raporlar updated = raporlarRepository.save(r);
        return toResponse(updated);
    }


    @Transactional
    @Override
    public void deleteRapor(Integer id) {
        Raporlar r = raporlarRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rapor bulunamadı: " + id));
        raporlarRepository.delete(r);
    }

    // --- Helper mapper ---
    private RaporlarResponse toResponse(Raporlar r) {
        RaporlarCategory c = r.getRaporCategory();
        return new RaporlarResponse(
                r.getRaporId(),
                r.getRaporBaslik(),
                r.getRaporUrl(),
                c != null ? c.getCategoryId() : null,
                c != null ? c.getCategoryName() : null,
                r.getRaporTarihi(),
                r.isRaporDurum()
        );
    }
}
