package com.kocaeli.bel.repository.hizmetler;

import com.kocaeli.bel.model.hizmetler.GeriDonusumDetayeEnitity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GeriDonusumDetayRepository extends JpaRepository<GeriDonusumDetayeEnitity, Long> {

    // Kategori bazlı arama
    List<GeriDonusumDetayeEnitity> findByKategori(String kategori);

    // Başlığa göre arama
    Optional<GeriDonusumDetayeEnitity> findByBaslik(String baslik);

    // Kategori ve başlığa göre arama
    List<GeriDonusumDetayeEnitity> findByKategoriAndBaslikContaining(String kategori, String baslik);

    // İçerik araması
    List<GeriDonusumDetayeEnitity> findByDetayContaining(String detay);

    // Var olup olmadığını kontrol etme
    boolean existsByBaslik(String baslik);
}