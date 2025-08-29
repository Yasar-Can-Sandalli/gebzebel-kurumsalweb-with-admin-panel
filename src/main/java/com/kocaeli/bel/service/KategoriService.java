package com.kocaeli.bel.service;

import com.kocaeli.bel.model.Kategori;
import java.util.List;
import java.util.Optional;

public interface KategoriService {
    List<Kategori> getAllKategoriler();
    Optional<Kategori> getKategoriById(Long id);
    Kategori createKategori(Kategori kategori);
    Kategori updateKategori(Long id, Kategori kategoriDetails);
    boolean deleteKategori(Long id);
}

