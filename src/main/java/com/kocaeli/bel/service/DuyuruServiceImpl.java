package com.kocaeli.bel.service;

import com.kocaeli.bel.model.Duyuru;
import com.kocaeli.bel.repository.DuyuruRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class DuyuruServiceImpl implements DuyuruService {

    private final DuyuruRepository duyuruRepository;

    private static final DateTimeFormatter ISO_MINUTE =
            DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");
    private static final DateTimeFormatter DB_FORMAT =
            DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    /** Yardımcı: "2025-05-21 15:17:21" ya da "2025-05-21T15:17" -> LocalDateTime */
    private LocalDateTime parseDateFlexible(String raw) {
        if (raw == null || raw.isBlank()) return null;
        try {
            if (raw.contains("T") && raw.length() <= 16) { // yyyy-MM-ddTHH:mm
                return LocalDateTime.parse(raw, ISO_MINUTE);
            }
            if (raw.contains(" ")) { // yyyy-MM-dd HH:mm:ss
                return LocalDateTime.parse(raw, DB_FORMAT);
            }
            // Son çare: LocalDateTime.parse ISO  (yyyy-MM-ddTHH:mm:ss)
            return LocalDateTime.parse(raw);
        } catch (Exception e) {
            // parse edilemezse null bırak
            return null;
        }
    }

    @Transactional
    public Duyuru update(Long id, Duyuru payload) {
        Duyuru entity = duyuruRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Duyuru bulunamadı: " + id));

        // Alanları kademeli güncelle (null olanları es geç)
        if (payload.getBaslik() != null) {
            entity.setBaslik(payload.getBaslik());
        }
        if (payload.getOzet() != null) {
            entity.setOzet(payload.getOzet());
        }
        // Tarih hem String hem LocalDateTime gelebilir: esnek davran
        if (payload.getTarih() != null) {
            entity.setTarih(payload.getTarih());
        }
            entity.setOnemli(payload.getOnemli());


        return duyuruRepository.save(entity);
    }

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

