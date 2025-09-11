package com.kocaeli.bel.service;

import com.kocaeli.bel.DTO.hizmetler.HaberlerDTO;
import com.kocaeli.bel.model.Haberler;
import com.kocaeli.bel.model.Kategori;
import com.kocaeli.bel.repository.HaberlerRepository;
import com.kocaeli.bel.repository.KategoriRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
//YCS
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

    public Haberler createHaberler(HaberlerDTO dto) {
        Haberler h = new Haberler();
        h.setBaslik(dto.getBaslik());
        h.setAciklama(dto.getAciklama());
        h.setResim1(dto.getResim1());
        h.setResim2(dto.getResim2());


        // Tarih iki formattan da gelebilsin:
        // Öncelik ISO (input type="date" zaten "yyyy-MM-dd" gönderir)
        h.setTarih(parseDateFlexible(dto.getTarih()));

        if (dto.getKategoriId() != null) {
            // performans için proxy referansı yeterli
            Kategori kRef = kategoriRepository.findById(dto.getKategoriId())
                    .orElseThrow(() -> new IllegalArgumentException("Geçersiz kategoriId: " + dto.getKategoriId()));
            h.setKategori(kRef);
        } else {
            h.setKategori(null);
        }

        return haberlerRepository.save(h);
    }
    // Yardımcı: iki formatı da kabul et
    private LocalDate parseDateFlexible(String s) {
        if (s == null || s.isBlank()) return null;
        // En çok tavsiye edilen: ISO "yyyy-MM-dd"
        try {
            return LocalDate.parse(s); // ISO default
        } catch (Exception ignore) {}
        // UI "26.09.2025" yollarsa:
        try {
            DateTimeFormatter tr = DateTimeFormatter.ofPattern("dd.MM.yyyy");
            return LocalDate.parse(s, tr);
        } catch (Exception e) {
            throw new IllegalArgumentException("Tarih formatı geçersiz: " + s);
        }
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
    //YCS
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
