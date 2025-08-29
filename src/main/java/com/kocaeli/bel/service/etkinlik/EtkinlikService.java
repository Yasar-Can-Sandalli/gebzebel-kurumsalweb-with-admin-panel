package com.kocaeli.bel.service.etkinlik;

import com.kocaeli.bel.model.etkinlik.EtkinlikEntity;
import com.kocaeli.bel.repository.etkinlik.EtkinlikRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EtkinlikService {
    private final EtkinlikRepository etkinlikRepository;

    @Autowired
    public EtkinlikService(EtkinlikRepository etkinlikRepository) {
        this.etkinlikRepository = etkinlikRepository;
    }

    public List<EtkinlikEntity> getAllEtkinlikler() {
        return etkinlikRepository.findAll();
    }
}
