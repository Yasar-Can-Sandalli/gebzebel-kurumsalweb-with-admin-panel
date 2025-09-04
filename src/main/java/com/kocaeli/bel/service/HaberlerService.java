package com.kocaeli.bel.service;

import com.kocaeli.bel.DTO.gebze.HaberlerDto;
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

    // Haberler ve Kategoriler için repository'ler otomatik olarak enjekte ediliyor.
    @Autowired
    private HaberlerRepository haberlerRepository;

    @Autowired
    private KategoriRepository kategoriRepository;

    /**
     * Tüm haberleri kategori bilgileriyle birlikte çeker.
     * HaberlerRepository içinde tanımlı özel bir metot kullanır (varsayılan olarak).
     */
    public List<Haberler> getAllHaberler() {
        return haberlerRepository.findAllWithKategori(); // HaberlerRepository'de bu metot tanımlı olmalıdır.
    }

    /**
     * Tüm haberleri tarihe göre en yeniden en eskiye doğru sıralayarak çeker.
     */
    public List<Haberler> getAllHaberlerByTarihDesc() {
        return haberlerRepository.findAllWithKategoriOrderByTarihDesc();
    }

    /**
     * Verilen ID'ye sahip haberi bulur ve döndürür.
     * Eğer haber bulunamazsa boş bir Optional döner.
     */
    public Optional<Haberler> getHaberlerById(Long id) {
        return haberlerRepository.findById(id);
    }


    // HaberlerDto'yu parametre olarak alan ve onu Haberler nesnesine dönüştüren metot
    public Haberler createHaberler(HaberlerDto haberlerDto) {
        Haberler haberler = new Haberler();
        haberler.setBaslik(haberlerDto.getBaslik());
        haberler.setTarih(haberlerDto.getTarih());
        haberler.setAciklama(haberlerDto.getAciklama());
        haberler.setResim1(haberlerDto.getResim1());
        haberler.setResim2(haberlerDto.getResim2());


        if (haberlerDto.getKategoriId() != null) {
            // Güvenli atama: kategori bulunamazsa null bırak
            kategoriRepository
                    .findById(haberlerDto.getKategoriId())
                    .ifPresent(haberler::setKategori);
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