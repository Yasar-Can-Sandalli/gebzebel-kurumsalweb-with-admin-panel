package com.kocaeli.bel.service;

import com.kocaeli.bel.model.Haberler;
import com.kocaeli.bel.repository.HaberlerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HaberlerService {

    @Autowired
    private HaberlerRepository haberlerRepository;

    public List<Haberler> getAllHaberler() {
        List<Haberler> haberler = haberlerRepository.findAllWithKategori();
        System.out.println("Found " + haberler.size() + " haberler");

        // Debug each haber's kategori
        haberler.forEach(haber -> {
            System.out.println("Haber ID: " + haber.getId());
            if (haber.getKategori() != null) {
                System.out.println("  Kategori ID: " + haber.getKategori().getId());
                System.out.println("  Kategori Ad: " + haber.getKategori().getAd());
            } else {
                System.out.println("  No kategori found!");
            }
        });

        return haberler;
    }
    public List<Haberler> getAllHaberlerByTarihDesc() {
        return haberlerRepository.findAllWithKategoriOrderByTarihDesc();
    }

    public Optional<Haberler> getHaberlerById(Long id) {
        return haberlerRepository.findById(id);
    }

    public Haberler createHaberler(Haberler haberler) {
        return haberlerRepository.save(haberler);
    }

    public Haberler updateHaberler(Long id, Haberler haberlerDetails) {
        Optional<Haberler> haberler = haberlerRepository.findById(id);
        if (haberler.isPresent()) {
            haberler.get().setBaslik(haberlerDetails.getBaslik());
            haberler.get().setTarih(haberlerDetails.getTarih());
            haberler.get().setAciklama(haberlerDetails.getAciklama());
            haberler.get().setResim1(haberlerDetails.getResim1());
            haberler.get().setResim2(haberlerDetails.getResim2());
            return haberlerRepository.save(haberler.get());
        } else {
            return null;
        }
    }

    public boolean deleteHaberler(Long id) {
        if (haberlerRepository.existsById(id)) {
            haberlerRepository.deleteById(id);
            return true;
        }
        return false;
    }
}