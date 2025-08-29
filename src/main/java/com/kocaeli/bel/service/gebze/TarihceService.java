package com.kocaeli.bel.service.gebze;
import com.kocaeli.bel.DTO.gebze.TarihceDTO;
import com.kocaeli.bel.model.gebze.TarihceEntity;
import com.kocaeli.bel.repository.gebze.TarihceRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TarihceService {
    private final TarihceRepository tarihceRepository;

    @Autowired
    public TarihceService(TarihceRepository tarihceRepository) {
        this.tarihceRepository = tarihceRepository;
    }

    public List<TarihceDTO> findByType(String type) {
        List<TarihceEntity> entities = tarihceRepository.findByType(type);
        return entities.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public TarihceDTO saveTarihce(TarihceDTO tarihceDTO) {
        TarihceEntity entity = convertToEntity(tarihceDTO);
        entity = tarihceRepository.save(entity);
        return convertToDTO(entity);
    }

    private TarihceDTO convertToDTO(TarihceEntity entity) {
        TarihceDTO dto = new TarihceDTO();
        BeanUtils.copyProperties(entity, dto);
        return dto;
    }

    private TarihceEntity convertToEntity(TarihceDTO dto) {
        TarihceEntity entity = new TarihceEntity();
        BeanUtils.copyProperties(dto, entity);
        return entity;
    }
}
