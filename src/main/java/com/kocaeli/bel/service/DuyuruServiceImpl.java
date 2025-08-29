package com.kocaeli.bel.service;

import com.kocaeli.bel.model.Duyuru;
import com.kocaeli.bel.repository.DuyuruRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DuyuruServiceImpl implements DuyuruService {
    private final DuyuruRepository duyuruRepository;

    @Autowired
    public DuyuruServiceImpl(DuyuruRepository duyuruRepository) {
        this.duyuruRepository = duyuruRepository;
    }

    @Override
    public List<Duyuru> getAllDuyurular() {

        return duyuruRepository.findAllByOrderByTarihDesc();

    }

    @Override
    public Duyuru getDuyuruById(Long id) {
        Optional<Duyuru> duyuru = duyuruRepository.findById(id);
        return duyuru.orElse(null);
    }

    @Override
    public Duyuru saveDuyuru(Duyuru duyuru) {
        return duyuruRepository.save(duyuru);
    }

    @Override
    public void deleteDuyuru(Long id) {
        duyuruRepository.deleteById(id);
    }
}