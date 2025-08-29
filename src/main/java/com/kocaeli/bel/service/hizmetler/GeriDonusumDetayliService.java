package com.kocaeli.bel.service.hizmetler;
import com.kocaeli.bel.DTO.hizmetler.GeriDonusumDetayliDTO;
import com.kocaeli.bel.model.hizmetler.GeriDonusumDetayliEntity;
import com.kocaeli.bel.repository.hizmetler.GeriDonusumDetayliRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.ArrayList;

@Service
@Transactional
public class GeriDonusumDetayliService {

    @Autowired
    private GeriDonusumDetayliRepository repository;

    // Get all records
    public List<GeriDonusumDetayliDTO> getAllGeriDonusumDetayli() {
        List<GeriDonusumDetayliEntity> entities = repository.findAllOrderById();
        return entities.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get by ID
    public Optional<GeriDonusumDetayliDTO> getGeriDonusumDetayliById(Long id) {
        Optional<GeriDonusumDetayliEntity> entity = repository.findById(id);
        return entity.map(this::convertToDTO);
    }

    // Get by table name
    public Optional<GeriDonusumDetayliDTO> getGeriDonusumDetayliByTabloAdi(String tabloAdi) {
        Optional<GeriDonusumDetayliEntity> entity = repository.findByTabloAdi(tabloAdi);
        return entity.map(this::convertToDTO);
    }

    // Get by table title
    public List<GeriDonusumDetayliDTO> getGeriDonusumDetayliByTabloBaslik(String tabloBaslik) {
        List<GeriDonusumDetayliEntity> entities = repository.findByTabloBaslik(tabloBaslik);
        return entities.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Search functionality
    public List<GeriDonusumDetayliDTO> searchGeriDonusumDetayli(String searchTerm) {
        List<GeriDonusumDetayliEntity> entities = repository.searchInAllFields(searchTerm);
        return entities.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get entities with images
    public List<GeriDonusumDetayliDTO> getGeriDonusumDetayliWithImages() {
        List<GeriDonusumDetayliEntity> entities = repository.findAllWithImages();
        return entities.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get entities with complete table data
    public List<GeriDonusumDetayliDTO> getGeriDonusumDetayliWithCompleteData() {
        List<GeriDonusumDetayliEntity> entities = repository.findAllWithCompleteTableData();
        return entities.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Save new record
    public GeriDonusumDetayliDTO saveGeriDonusumDetayli(GeriDonusumDetayliDTO dto) {
        GeriDonusumDetayliEntity entity = convertToEntity(dto);
        GeriDonusumDetayliEntity savedEntity = repository.save(entity);
        return convertToDTO(savedEntity);
    }

    // Update existing record
    public Optional<GeriDonusumDetayliDTO> updateGeriDonusumDetayli(Long id, GeriDonusumDetayliDTO dto) {
        Optional<GeriDonusumDetayliEntity> existingEntity = repository.findById(id);

        if (existingEntity.isPresent()) {
            GeriDonusumDetayliEntity entity = existingEntity.get();
            updateEntityFromDTO(entity, dto);
            GeriDonusumDetayliEntity updatedEntity = repository.save(entity);
            return Optional.of(convertToDTO(updatedEntity));
        }

        return Optional.empty();
    }

    // Delete record
    public boolean deleteGeriDonusumDetayli(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    // Check if table name exists
    public boolean existsByTabloAdi(String tabloAdi) {
        return repository.existsByTabloAdi(tabloAdi);
    }

    // Count records
    public long countAll() {
        return repository.count();
    }

    // Convert Entity to DTO
    private GeriDonusumDetayliDTO convertToDTO(GeriDonusumDetayliEntity entity) {
        GeriDonusumDetayliDTO dto = new GeriDonusumDetayliDTO();
        dto.setId(entity.getId());
        dto.setResimUrl(entity.getResimUrl());
        dto.setDetay(entity.getDetay());
        dto.setTabloBaslik(entity.getTabloBaslik());
        dto.setTabloBaslik2(entity.getTabloBaslik2());
        dto.setTabloAdi(entity.getTabloAdi());

        // Convert individual column rows to lists
        List<String> sutun1Satirlar = new ArrayList<>();
        addIfNotNull(sutun1Satirlar, entity.getSutun1Satir1());
        addIfNotNull(sutun1Satirlar, entity.getSutun1Satir2());
        addIfNotNull(sutun1Satirlar, entity.getSutun1Satir3());
        addIfNotNull(sutun1Satirlar, entity.getSutun1Satir4());
        addIfNotNull(sutun1Satirlar, entity.getSutun1Satir5());
        addIfNotNull(sutun1Satirlar, entity.getSutun1Satir6());
        addIfNotNull(sutun1Satirlar, entity.getSutun1Satir7());
        addIfNotNull(sutun1Satirlar, entity.getSutun1Satir8());
        addIfNotNull(sutun1Satirlar, entity.getSutun1Satir9());
        addIfNotNull(sutun1Satirlar, entity.getSutun1Satir10());
        addIfNotNull(sutun1Satirlar, entity.getSutun1Satir11());

        List<String> sutun2Satirlar = new ArrayList<>();
        addIfNotNull(sutun2Satirlar, entity.getSutun2Satir1());
        addIfNotNull(sutun2Satirlar, entity.getSutun2Satir2());
        addIfNotNull(sutun2Satirlar, entity.getSutun2Satir3());
        addIfNotNull(sutun2Satirlar, entity.getSutun2Satir4());
        addIfNotNull(sutun2Satirlar, entity.getSutun2Satir5());
        addIfNotNull(sutun2Satirlar, entity.getSutun2Satir6());
        addIfNotNull(sutun2Satirlar, entity.getSutun2Satir7());
        addIfNotNull(sutun2Satirlar, entity.getSutun2Satir8());
        addIfNotNull(sutun2Satirlar, entity.getSutun2Satir9());
        addIfNotNull(sutun2Satirlar, entity.getSutun2Satir10());
        addIfNotNull(sutun2Satirlar, entity.getSutun2Satir11());

        dto.setSutun1Satirlar(sutun1Satirlar);
        dto.setSutun2Satirlar(sutun2Satirlar);

        return dto;
    }

    // Convert DTO to Entity
    private GeriDonusumDetayliEntity convertToEntity(GeriDonusumDetayliDTO dto) {
        GeriDonusumDetayliEntity entity = new GeriDonusumDetayliEntity();
        entity.setResimUrl(dto.getResimUrl());
        entity.setDetay(dto.getDetay());
        entity.setTabloBaslik(dto.getTabloBaslik());
        entity.setTabloBaslik2(dto.getTabloBaslik2());
        entity.setTabloAdi(dto.getTabloAdi());

        // Convert lists to individual column rows
        List<String> sutun1Satirlar = dto.getSutun1Satirlar();
        if (sutun1Satirlar != null) {
            if (sutun1Satirlar.size() > 0) entity.setSutun1Satir1(sutun1Satirlar.get(0));
            if (sutun1Satirlar.size() > 1) entity.setSutun1Satir2(sutun1Satirlar.get(1));
            if (sutun1Satirlar.size() > 2) entity.setSutun1Satir3(sutun1Satirlar.get(2));
            if (sutun1Satirlar.size() > 3) entity.setSutun1Satir4(sutun1Satirlar.get(3));
            if (sutun1Satirlar.size() > 4) entity.setSutun1Satir5(sutun1Satirlar.get(4));
            if (sutun1Satirlar.size() > 5) entity.setSutun1Satir6(sutun1Satirlar.get(5));
            if (sutun1Satirlar.size() > 6) entity.setSutun1Satir7(sutun1Satirlar.get(6));
            if (sutun1Satirlar.size() > 7) entity.setSutun1Satir8(sutun1Satirlar.get(7));
            if (sutun1Satirlar.size() > 8) entity.setSutun1Satir9(sutun1Satirlar.get(8));
            if (sutun1Satirlar.size() > 9) entity.setSutun1Satir10(sutun1Satirlar.get(9));
            if (sutun1Satirlar.size() > 10) entity.setSutun1Satir11(sutun1Satirlar.get(10));
        }

        List<String> sutun2Satirlar = dto.getSutun2Satirlar();
        if (sutun2Satirlar != null) {
            if (sutun2Satirlar.size() > 0) entity.setSutun2Satir1(sutun2Satirlar.get(0));
            if (sutun2Satirlar.size() > 1) entity.setSutun2Satir2(sutun2Satirlar.get(1));
            if (sutun2Satirlar.size() > 2) entity.setSutun2Satir3(sutun2Satirlar.get(2));
            if (sutun2Satirlar.size() > 3) entity.setSutun2Satir4(sutun2Satirlar.get(3));
            if (sutun2Satirlar.size() > 4) entity.setSutun2Satir5(sutun2Satirlar.get(4));
            if (sutun2Satirlar.size() > 5) entity.setSutun2Satir6(sutun2Satirlar.get(5));
            if (sutun2Satirlar.size() > 6) entity.setSutun2Satir7(sutun2Satirlar.get(6));
            if (sutun2Satirlar.size() > 7) entity.setSutun2Satir8(sutun2Satirlar.get(7));
            if (sutun2Satirlar.size() > 8) entity.setSutun2Satir9(sutun2Satirlar.get(8));
            if (sutun2Satirlar.size() > 9) entity.setSutun2Satir10(sutun2Satirlar.get(9));
            if (sutun2Satirlar.size() > 10) entity.setSutun2Satir11(sutun2Satirlar.get(10));
        }

        return entity;
    }

    // Update existing entity with DTO data
    private void updateEntityFromDTO(GeriDonusumDetayliEntity entity, GeriDonusumDetayliDTO dto) {
        entity.setResimUrl(dto.getResimUrl());
        entity.setDetay(dto.getDetay());
        entity.setTabloBaslik(dto.getTabloBaslik());
        entity.setTabloBaslik2(dto.getTabloBaslik2());
        entity.setTabloAdi(dto.getTabloAdi());

        // Clear existing data
        entity.setSutun1Satir1(null);
        entity.setSutun1Satir2(null);
        entity.setSutun1Satir3(null);
        entity.setSutun1Satir4(null);
        entity.setSutun1Satir5(null);
        entity.setSutun1Satir6(null);
        entity.setSutun1Satir7(null);
        entity.setSutun1Satir8(null);
        entity.setSutun1Satir9(null);
        entity.setSutun1Satir10(null);
        entity.setSutun1Satir11(null);

        entity.setSutun2Satir1(null);
        entity.setSutun2Satir2(null);
        entity.setSutun2Satir3(null);
        entity.setSutun2Satir4(null);
        entity.setSutun2Satir5(null);
        entity.setSutun2Satir6(null);
        entity.setSutun2Satir7(null);
        entity.setSutun2Satir8(null);
        entity.setSutun2Satir9(null);
        entity.setSutun2Satir10(null);
        entity.setSutun2Satir11(null);

        // Set new data
        List<String> sutun1Satirlar = dto.getSutun1Satirlar();
        if (sutun1Satirlar != null) {
            if (sutun1Satirlar.size() > 0) entity.setSutun1Satir1(sutun1Satirlar.get(0));
            if (sutun1Satirlar.size() > 1) entity.setSutun1Satir2(sutun1Satirlar.get(1));
            if (sutun1Satirlar.size() > 2) entity.setSutun1Satir3(sutun1Satirlar.get(2));
            if (sutun1Satirlar.size() > 3) entity.setSutun1Satir4(sutun1Satirlar.get(3));
            if (sutun1Satirlar.size() > 4) entity.setSutun1Satir5(sutun1Satirlar.get(4));
            if (sutun1Satirlar.size() > 5) entity.setSutun1Satir6(sutun1Satirlar.get(5));
            if (sutun1Satirlar.size() > 6) entity.setSutun1Satir7(sutun1Satirlar.get(6));
            if (sutun1Satirlar.size() > 7) entity.setSutun1Satir8(sutun1Satirlar.get(7));
            if (sutun1Satirlar.size() > 8) entity.setSutun1Satir9(sutun1Satirlar.get(8));
            if (sutun1Satirlar.size() > 9) entity.setSutun1Satir10(sutun1Satirlar.get(9));
            if (sutun1Satirlar.size() > 10) entity.setSutun1Satir11(sutun1Satirlar.get(10));
        }

        List<String> sutun2Satirlar = dto.getSutun2Satirlar();
        if (sutun2Satirlar != null) {
            if (sutun2Satirlar.size() > 0) entity.setSutun2Satir1(sutun2Satirlar.get(0));
            if (sutun2Satirlar.size() > 1) entity.setSutun2Satir2(sutun2Satirlar.get(1));
            if (sutun2Satirlar.size() > 2) entity.setSutun2Satir3(sutun2Satirlar.get(2));
            if (sutun2Satirlar.size() > 3) entity.setSutun2Satir4(sutun2Satirlar.get(3));
            if (sutun2Satirlar.size() > 4) entity.setSutun2Satir5(sutun2Satirlar.get(4));
            if (sutun2Satirlar.size() > 5) entity.setSutun2Satir6(sutun2Satirlar.get(5));
            if (sutun2Satirlar.size() > 6) entity.setSutun2Satir7(sutun2Satirlar.get(6));
            if (sutun2Satirlar.size() > 7) entity.setSutun2Satir8(sutun2Satirlar.get(7));
            if (sutun2Satirlar.size() > 8) entity.setSutun2Satir9(sutun2Satirlar.get(8));
            if (sutun2Satirlar.size() > 9) entity.setSutun2Satir10(sutun2Satirlar.get(9));
            if (sutun2Satirlar.size() > 10) entity.setSutun2Satir11(sutun2Satirlar.get(10));
        }
    }

    // Helper method to add non-null values to list
    private void addIfNotNull(List<String> list, String value) {
        if (value != null && !value.trim().isEmpty()) {
            list.add(value);
        }
    }
}
