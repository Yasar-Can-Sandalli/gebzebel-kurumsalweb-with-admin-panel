package com.kocaeli.bel.service.kurumsal;

import com.kocaeli.bel.model.kurumsal.BaskanEntity;
import com.kocaeli.bel.repository.kurumsal.BaskanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class BaskanService {
    private final BaskanRepository baskanRepository;

    @Autowired
    public BaskanService(BaskanRepository baskanRepository) {
        this.baskanRepository = baskanRepository;
    }

    public List<BaskanEntity> getAllActiveBaskan() {
        return baskanRepository.findAllActive();
    }

    public List<BaskanEntity> getActiveByKategori(String kategori) {
        return baskanRepository.findActiveByKategori(kategori);
    }

    public Optional<BaskanEntity> getActiveByIdAndKategori(Long id, String kategori) {
        return baskanRepository.findActiveByIdAndKategori(id, kategori);
    }

    public Optional<BaskanEntity> getActiveBaskanById(Long id) {
        return baskanRepository.findActiveById(id);
    }

    public List<BaskanEntity> getAllInactiveBaskan() {
        return baskanRepository.findAllInactive();
    }

    public List<BaskanEntity> getAllBaskan() {
        return baskanRepository.findAll();
    }

    public Optional<BaskanEntity> getBaskanById(Long id) {
        return baskanRepository.findById(id);
    }

    public BaskanEntity saveBaskan(BaskanEntity baskan) {
        if (baskan.getDelta() == null) {
            baskan.setDelta(0);
        }
        return baskanRepository.save(baskan);
    }

    public BaskanEntity saveAndActivateBaskan(BaskanEntity baskan) {
        String kategori = baskan.getKategori();
        if (kategori != null) {
            List<BaskanEntity> activeList = baskanRepository.findActiveByKategori(kategori);
            for (BaskanEntity active : activeList) {
                active.setDelta(0);
                baskanRepository.save(active);
            }
        }
        baskan.setDelta(1);
        return baskanRepository.save(baskan);
    }

    public void deactivateBaskan(Long id) {
        baskanRepository.findById(id).ifPresent(b -> {
            b.setDelta(0);
            baskanRepository.save(b);
        });
    }

    public void deleteBaskan(Long id) {
        baskanRepository.deleteById(id);
    }
}
