package com.kocaeli.bel.service.gebze;
import com.kocaeli.bel.DTO.gebze.TarihceDTO;
import com.kocaeli.bel.model.gebze.TarihceEntity;
import com.kocaeli.bel.repository.gebze.TarihceRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
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

    @Transactional
    public TarihceDTO update(Long id, TarihceDTO dto, String expectedType) {
        TarihceEntity entity = tarihceRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Kayıt bulunamadı: " + id));

        if (expectedType != null && entity.getType() != null && !entity.getType().equalsIgnoreCase(expectedType)) {
            throw new IllegalArgumentException("Bu kayıt " + entity.getType() + " türünde. Beklenen: " + expectedType);
        }

        Long originalId = entity.getId();
        String originalType = entity.getType();

        // Tüm güncellenebilir alanları dto’dan kopyala; id ve type’ı koru
        BeanUtils.copyProperties(dto, entity, "id", "type");

        entity.setId(originalId);
        entity.setType(originalType != null ? originalType : expectedType);

        TarihceEntity saved = tarihceRepository.save(entity);
        return convertToDTO(saved);
    }

}
