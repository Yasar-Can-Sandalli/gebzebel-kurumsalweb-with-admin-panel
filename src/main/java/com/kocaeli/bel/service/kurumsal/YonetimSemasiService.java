package com.kocaeli.bel.service.kurumsal;

import com.kocaeli.bel.model.kurumsal.YonetimSemasiEntity;
import com.kocaeli.bel.repository.kurumsal.YonetimSemasiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class YonetimSemasiService {
    private final YonetimSemasiRepository yonetimSemasiRepository;

    @Autowired
    public YonetimSemasiService(YonetimSemasiRepository yonetimSemasiRepository) {
        this.yonetimSemasiRepository = yonetimSemasiRepository;
    }

    public List<YonetimSemasiEntity> getBaskan() {
        return yonetimSemasiRepository.findBaskan();
    }

    public List<YonetimSemasiEntity> getBaskanYardimcilari() {
        Integer delta = 1; // Aktif başkan yardımcılarını almak için delta değerini 1 olarak ayarlıyoruz
        return yonetimSemasiRepository.findBaskanYardimcilariWithFilters(delta);
    }

    public List<YonetimSemasiEntity> getBaskanDanismanlari() {
        return yonetimSemasiRepository.findBaskanDanismanlari();
    }

    public Optional<YonetimSemasiEntity> getBaskanYardimcisiById(Long id) {
        return yonetimSemasiRepository.findById(id)
                .filter(entity -> "Başkan Yardımcısı".equals(entity.getPozisyon()));
    }

    public YonetimSemasiEntity saveBaskanYardimcisi(YonetimSemasiEntity baskanYardimcisi) {
        baskanYardimcisi.setPozisyon("Başkan Yardımcısı");
        if (baskanYardimcisi.getDelta() == null) {
            baskanYardimcisi.setDelta(1);
        }
        return yonetimSemasiRepository.save(baskanYardimcisi);
    }

    public void deleteBaskanYardimcisi(Long id) {
        yonetimSemasiRepository.deleteById(id);
    }

    public void deleteBaskanYardimcilari(List<Long> ids) {
        yonetimSemasiRepository.deleteAllById(ids);
    }

    public YonetimSemasiEntity getById(Long id) {
        return yonetimSemasiRepository.findById(id).orElse(null);
    }

    public YonetimSemasiEntity save(YonetimSemasiEntity entity) {
        return yonetimSemasiRepository.save(entity);
    }
}