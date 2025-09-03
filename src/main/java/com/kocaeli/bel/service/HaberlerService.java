package com.kocaeli.bel.service;

import com.kocaeli.bel.model.Haberler;
import com.kocaeli.bel.model.Kategori;
import com.kocaeli.bel.repository.HaberlerRepository;
import com.kocaeli.bel.repository.KategoriRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HaberlerService {

    @Autowired
    private HaberlerRepository haberlerRepository;

    @Autowired
    private KategoriRepository kategoriRepository;

    public List<Haberler> getAllHaberler() {
        return haberlerRepository.findAllWithKategori();
    }

    public List<Haberler> getAllHaberlerByTarihDesc() {
        return haberlerRepository.findAllWithKategoriOrderByTarihDesc();
    }

    public Optional<Haberler> getHaberlerById(Long id) {
        return haberlerRepository.findById(id);
    }

    public Haberler createHaberler(Haberler haberler) {
        if (haberler.getKategori() != null && haberler.getKategori().getId() != null) {
            Optional<Kategori> kategori = kategoriRepository.findById(haberler.getKategori().getId());
            kategori.ifPresent(haberler::setKategori);
        }
        return haberlerRepository.save(haberler);
    }

    public Haberler updateHaberler(Long id, Haberler haberlerDetails) {
        Optional<Haberler> haberler = haberlerRepository.findById(id);
        if (haberler.isPresent()) {
            Haberler h = haberler.get();
            h.setBaslik(haberlerDetails.getBaslik());
            h.setTarih(haberlerDetails.getTarih());
            h.setAciklama(haberlerDetails.getAciklama());
            h.setResim1(haberlerDetails.getResim1());
            h.setResim2(haberlerDetails.getResim2());

            if (haberlerDetails.getKategori() != null && haberlerDetails.getKategori().getId() != null) {
                Optional<Kategori> kategori = kategoriRepository.findById(haberlerDetails.getKategori().getId());
                kategori.ifPresent(h::setKategori);
            } else {
                h.setKategori(null);
            }

            return haberlerRepository.save(h);
        } else {
            return null;
        }
    }

    public boolean deleteHaberler(Long id) {
        Optional<Haberler> existingHaber = haberlerRepository.findById(id);
        if (existingHaber.isPresent()) {
            haberlerRepository.deleteById(id);
            return true;
        } else {
            System.err.println("Haber Bulunamadı !!!");
            return false;
        }
    }
}
