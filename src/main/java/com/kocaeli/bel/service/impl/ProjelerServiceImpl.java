package com.kocaeli.bel.service.impl;

import com.kocaeli.bel.model.Projeler;
import com.kocaeli.bel.repository.ProjelerRepository;
import com.kocaeli.bel.service.ProjelerService;
import org.springframework.stereotype.Service;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class ProjelerServiceImpl implements ProjelerService {

    private final ProjelerRepository projelerRepository;

    public ProjelerServiceImpl(ProjelerRepository projelerRepository) {
        this.projelerRepository = projelerRepository;
    }

    @Override
    public List<Projeler> getAllProjeler() {
        return projelerRepository.findAll();
    }

    @Override
    public Projeler getProjeById(Long id) {
        return projelerRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Proje bulunamadı id: " + id));
    }

    @Override
    public Projeler saveProje(Projeler proje) {
        return projelerRepository.save(proje);
    }

    @Override
    public Projeler updateProje(Long id, Projeler proje) {
        Projeler existingProje = getProjeById(id);
        existingProje.setBaslik(proje.getBaslik());
        existingProje.setResimUrl(proje.getResimUrl());
        existingProje.setDurumu(proje.getDurumu());
        return projelerRepository.save(existingProje);
    }

    @Override
    public void deleteProje(Long id) {
        projelerRepository.deleteById(id);
    }
}
