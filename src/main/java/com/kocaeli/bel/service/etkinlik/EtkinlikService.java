package com.kocaeli.bel.service.etkinlik;

import com.kocaeli.bel.model.etkinlik.Etkinlik;
import com.kocaeli.bel.repository.etkinlik.EtkinlikRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class EtkinlikService {

    @Autowired
    private final EtkinlikRepository etkinlikRepository;

    @Autowired
    public EtkinlikService(EtkinlikRepository etkinlikRepository) {
        this.etkinlikRepository = etkinlikRepository;
    }

    public List<Etkinlik> getAllEtkinlikler() {
        return etkinlikRepository.findAll();
    }

    public Etkinlik createEtkinlik(Etkinlik etkinlik) {
        return  etkinlikRepository.save(etkinlik);
    }


    public boolean updateEtkinlikById(Long id, Etkinlik etkinlik){
        Optional<Etkinlik> existingEtkinlik = etkinlikRepository.findById(id);

        if (existingEtkinlik.isPresent()) {
            Etkinlik entity = existingEtkinlik.get();
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
        Optional<Etkinlik> existingEtkinlik = etkinlikRepository.findById(id);

        if (existingEtkinlik.isPresent()) {
            etkinlikRepository.deleteById(id);
            return true;
        }else{
            System.err.println("Etkinlik Bulunamadı !!!");
            return false;
        }

    }

}