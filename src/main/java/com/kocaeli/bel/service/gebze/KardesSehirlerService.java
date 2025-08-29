package com.kocaeli.bel.service.gebze;
import com.kocaeli.bel.DTO.gebze.KardesSehirlerDTO;
import com.kocaeli.bel.model.gebze.KardesSehirlerEntity;
import com.kocaeli.bel.repository.gebze.KardesSehirlerRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class KardesSehirlerService {
    private final KardesSehirlerRepository repository;

    @Autowired
    public KardesSehirlerService(KardesSehirlerRepository repository) {
        this.repository = repository;
    }

    public List<KardesSehirlerDTO> getAllCities() {
        return repository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<KardesSehirlerDTO> getDomesticCities() {
        // Veritabanında "Yurt Ici" formatında kaydedilmiş
        List<KardesSehirlerEntity> domesticCities = repository.findByLocation("Yurt Ici");
        
        return domesticCities.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<KardesSehirlerDTO> getInternationalCities() {
        // Veritabanında "Yurt Disi" formatında kaydedilmiş
        List<KardesSehirlerEntity> internationalCities = repository.findByLocation("Yurt Disi");
        
        return internationalCities.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public KardesSehirlerDTO convertToDTO(KardesSehirlerEntity entity) {
        KardesSehirlerDTO dto = new KardesSehirlerDTO();
        BeanUtils.copyProperties(entity, dto);
        return dto;
    }

    public KardesSehirlerDTO createCity(KardesSehirlerDTO cityDTO) {
        KardesSehirlerEntity entity = new KardesSehirlerEntity();
        BeanUtils.copyProperties(cityDTO, entity);
        return convertToDTO(repository.save(entity));
    }

    public void deleteCity(Long id) {
        repository.deleteById(id);
    }
}
