package com.kocaeli.bel.service.haberler.impl;

import com.kocaeli.bel.DTO.haberler.CreateHaberRequest;
import com.kocaeli.bel.DTO.haberler.HaberlerResponse;
import com.kocaeli.bel.model.Haberler.Haberler;
import com.kocaeli.bel.model.Haberler.HaberlerCategory;
import com.kocaeli.bel.repository.haberler.HaberlerCategoryRepository;
import com.kocaeli.bel.repository.haberler.HaberlerRepository;
import com.kocaeli.bel.service.haberler.IHaberlerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HaberlerServiceImpl implements IHaberlerService {

    private final HaberlerRepository haberlerRepository;
    private final HaberlerCategoryRepository haberlerCategoryRepository;


    @Override
    public List<HaberlerResponse> getAllHaberler() {
        return haberlerRepository.findAll().stream()
                .map(this::toResponse).toList();
    }


    @Transactional(readOnly = true)
    @Override
    public HaberlerResponse getHaberById(Integer id) {
        Haberler h = haberlerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Haberler bulunamadı: " + id));
        return toResponse(h);
    }


    @Transactional
    @Override
    public HaberlerResponse saveHaber(CreateHaberRequest request) {
        HaberlerCategory hc = haberlerCategoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Kategori bulunamadı: " + request.getCategoryId()));

        Haberler h = new Haberler();
        h.setBaslik(request.getHaberBaslik());
        h.setTarih(request.getHaberTarih());
        h.setTarih(request.getHaberTarih());
        h.setAciklama(request.getHaberAciklama());
        h.setResim1(request.getHaberResim1());
        h.setResim2(request.getHaberResim2());
        h.setHaberCategory(hc);
        Haberler saved = haberlerRepository.save(h);
        return toResponse(saved);
    }

    @Transactional
    @Override
    public HaberlerResponse updateHaber(Integer id, CreateHaberRequest request) {

        Haberler h = haberlerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Haberler bulunamadı: " + id));

        if (request.getHaberBaslik() != null) h.setBaslik(request.getHaberBaslik());
        if (request.getHaberTarih() != null) h.setTarih(request.getHaberTarih());
        if (request.getHaberAciklama() != null) h.setAciklama(request.getHaberAciklama());
        if (request.getHaberResim1() != null) h.setResim1(request.getHaberResim1());
        if (request.getHaberResim2() != null) h.setResim2(request.getHaberResim2());

        if (request.getCategoryId() != null) {
            HaberlerCategory hc = haberlerCategoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Kategori bulunamadı: " + request.getCategoryId()));
            h.setHaberCategory(hc);
        }

        Haberler updated = haberlerRepository.save(h);
        return toResponse(updated);
    }


    @Transactional
    @Override
    public void deleteHaber(Integer id) {
        Haberler h = haberlerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Haberler bulunamadı: " + id));
        haberlerRepository.delete(h);
    }



    // --- Helper mapper ---

    private HaberlerResponse toResponse(Haberler h) {
        HaberlerCategory hc = h.getHaberCategory();
        return new HaberlerResponse(

                h.getId(),
                h.getBaslik(),
                h.getTarih(),
                h.getAciklama(),
                h.getResim1(),
                h.getResim2(),
                hc != null ? hc.getCategoryId() : null,
                hc != null ? hc.getCategoryName() : null
        );
    }

}
