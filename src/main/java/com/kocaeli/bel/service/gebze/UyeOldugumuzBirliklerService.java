package com.kocaeli.bel.service.gebze;

import com.kocaeli.bel.model.gebze.UyeOldugumuzBirlikler;
import com.kocaeli.bel.repository.gebze.UyeOldugumuzBirliklerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UyeOldugumuzBirliklerService {

    private final UyeOldugumuzBirliklerRepository uyeOldugumuzBirliklerRepository;

    @Autowired
    public UyeOldugumuzBirliklerService(UyeOldugumuzBirliklerRepository uyeOldugumuzBirliklerRepository) {
        this.uyeOldugumuzBirliklerRepository = uyeOldugumuzBirliklerRepository;
    }

    public List<UyeOldugumuzBirlikler> getAllUyeOldugumuzBirlikler() {
        return uyeOldugumuzBirliklerRepository.findAll();
    }

    public Optional<UyeOldugumuzBirlikler> getUyeOldugumuzBirliklerById(Long id) {
        return uyeOldugumuzBirliklerRepository.findById(id);
    }

    public UyeOldugumuzBirlikler saveUyeOldugumuzBirlikler(UyeOldugumuzBirlikler uyeOldugumuzBirlikler) {
        return uyeOldugumuzBirliklerRepository.save(uyeOldugumuzBirlikler);
    }

    public void deleteUyeOldugumuzBirlikler(Long id) {
        uyeOldugumuzBirliklerRepository.deleteById(id);
    }
}