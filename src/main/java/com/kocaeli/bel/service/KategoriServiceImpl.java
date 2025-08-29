package com.kocaeli.bel.service;

import com.kocaeli.bel.model.Kategori;
import com.kocaeli.bel.repository.KategoriRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class KategoriServiceImpl implements KategoriService {

    @Autowired
    private KategoriRepository kategoriRepository;

    @Override
    public List<Kategori> getAllKategoriler() {
        return kategoriRepository.findAll();
    }

    @Override
    public Optional<Kategori> getKategoriById(Long id) {
        return kategoriRepository.findById(id);
    }

    @Override
    public Kategori createKategori(Kategori kategori) {
        return kategoriRepository.save(kategori);
    }

    @Override
    public Kategori updateKategori(Long id, Kategori kategoriDetails) {
        return kategoriRepository.findById(id).map(kategori -> {
            kategori.setAd(kategoriDetails.getAd());
            return kategoriRepository.save(kategori);
        }).orElse(null);
    }

    @Override
    public boolean deleteKategori(Long id) {
        return kategoriRepository.findById(id).map(kategori -> {
            kategoriRepository.delete(kategori);
            return true;
        }).orElse(false);
    }
}

