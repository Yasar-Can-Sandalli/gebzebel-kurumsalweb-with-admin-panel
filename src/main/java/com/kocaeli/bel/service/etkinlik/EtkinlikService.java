package com.kocaeli.bel.service.etkinlik;

import com.kocaeli.bel.model.etkinlik.EtkinlikEntity;
import com.kocaeli.bel.repository.etkinlik.EtkinlikRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

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

    public EtkinlikEntity createEtkinlik(EtkinlikEntity etkinlik) {
        return  etkinlikRepository.save(etkinlik);
    }


    public boolean updateEtkinlikById(Long id,EtkinlikEntity etkinlik){
        Optional<EtkinlikEntity> existingEtkinlik = etkinlikRepository.findById(id);

        if (existingEtkinlik.isPresent()) {
            EtkinlikEntity entity = existingEtkinlik.get();
            entity.setBaslik(etkinlik.getBaslik());
            entity.setAciklama(etkinlik.getAciklama());
            entity.setTarih(etkinlik.getTarih());
            entity.setDelta(etkinlik.getDelta());
            entity.setResimUrl(etkinlik.getResimUrl());
            etkinlikRepository.save(entity);

            return true;
        }else {
            System.err.println("Etkinlik Bulunamadı");
            return false;

        }

    }


    public boolean deleteEtkinlikById(Long id){
        Optional<EtkinlikEntity> existingEtkinlik = etkinlikRepository.findById(id);

        if (existingEtkinlik.isPresent()) {
            etkinlikRepository.deleteById(id);
            return true;
        }else{
            System.err.println("Etkinlik Bulunamadı !!!");
            return false;
        } 

    }

}
