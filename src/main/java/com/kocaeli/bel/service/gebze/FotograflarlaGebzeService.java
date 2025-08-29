package com.kocaeli.bel.service.gebze;

import com.kocaeli.bel.DTO.gebze.FotograflarlaGebzeDTO;
import com.kocaeli.bel.model.gebze.FotograflarlaGebzeEntity;
import com.kocaeli.bel.repository.gebze.FotograflarlaGebzeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FotograflarlaGebzeService {

    private final FotograflarlaGebzeRepository fotograflarlaGebzeRepository;

    @Autowired
    public FotograflarlaGebzeService(FotograflarlaGebzeRepository fotograflarlaGebzeRepository) {
        this.fotograflarlaGebzeRepository = fotograflarlaGebzeRepository;
    }

    /**
     * Convert an entity to a DTO
     * @param entity the entity to convert
     * @return the corresponding DTO
     */
    private FotograflarlaGebzeDTO convertToDTO(FotograflarlaGebzeEntity entity) {
        FotograflarlaGebzeDTO dto = new FotograflarlaGebzeDTO();
        dto.setId(entity.getId());
        dto.setResimUrl(entity.getResimUrl());
        dto.setBaslik(entity.getBaslik());
        dto.setUrl(entity.getUrl());
        dto.setKonum(entity.getKonum());
        dto.setType(entity.getType());
        return dto;
    }

    /**
     * Convert a DTO to an entity
     * @param dto the DTO to convert
     * @return the corresponding entity
     */
    private FotograflarlaGebzeEntity convertToEntity(FotograflarlaGebzeDTO dto) {
        FotograflarlaGebzeEntity entity = new FotograflarlaGebzeEntity();
        entity.setId(dto.getId());
        entity.setResimUrl(dto.getResimUrl());
        entity.setBaslik(dto.getBaslik());
        entity.setUrl(dto.getUrl());
        entity.setKonum(dto.getKonum());
        entity.setType(dto.getType());
        return entity;
    }

    /**
     * Get all items (photos and virtual tours)
     * @return list of all items
     */
    @Transactional(readOnly = true)
    public List<FotograflarlaGebzeDTO> findAll() {
        return fotograflarlaGebzeRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get an item by ID
     * @param id the ID to look for
     * @return the matching item or null if not found
     */
    @Transactional(readOnly = true)
    public FotograflarlaGebzeDTO findById(Long id) {
        Optional<FotograflarlaGebzeEntity> entityOptional = fotograflarlaGebzeRepository.findById(id);
        return entityOptional.map(this::convertToDTO).orElse(null);
    }

    /**
     * Get items by type
     * @param type the type to filter by (photo or virtual_tour)
     * @return list of matching items
     */
    @Transactional(readOnly = true)
    public List<FotograflarlaGebzeDTO> findByType(String type) {
        return fotograflarlaGebzeRepository.findByType(type)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get items by location
     * @param konum the location to filter by
     * @return list of matching items
     */
    @Transactional(readOnly = true)
    public List<FotograflarlaGebzeDTO> findByKonum(String konum) {
        return fotograflarlaGebzeRepository.findByKonum(konum)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Search for items by title
     * @param baslik the title text to search for
     * @return list of matching items
     */
    @Transactional(readOnly = true)
    public List<FotograflarlaGebzeDTO> searchByTitle(String baslik) {
        return fotograflarlaGebzeRepository.searchByTitle(baslik)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Save or update an item
     * @param dto the item data to save or update
     * @return the saved or updated item
     */
    @Transactional
    public FotograflarlaGebzeDTO save(FotograflarlaGebzeDTO dto) {
        FotograflarlaGebzeEntity entity = convertToEntity(dto);
        entity = fotograflarlaGebzeRepository.save(entity);
        return convertToDTO(entity);
    }

    /**
     * Delete an item
     * @param id the ID of the item to delete
     */
    @Transactional
    public void delete(Long id) {
        fotograflarlaGebzeRepository.deleteById(id);
    }
}