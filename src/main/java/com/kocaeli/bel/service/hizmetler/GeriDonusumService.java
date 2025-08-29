package com.kocaeli.bel.service.hizmetler;
import com.kocaeli.bel.DTO.hizmetler.GeriDonusumDTO;
import com.kocaeli.bel.model.hizmetler.GeriDonusumEntity;
import com.kocaeli.bel.repository.hizmetler.GeriDonusumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import java.util.NoSuchElementException;

@Service
public class GeriDonusumService {
    private final GeriDonusumRepository geriDonusumRepository;

    @Autowired
    public GeriDonusumService(GeriDonusumRepository geriDonusumRepository) {
        this.geriDonusumRepository = geriDonusumRepository;
    }

    @Transactional(readOnly = true)
    public List<GeriDonusumDTO> getAllGeriDonusum() {
        List<GeriDonusumEntity> entities = geriDonusumRepository.findAll();
        return entities.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public GeriDonusumDTO getGeriDonusumById(Long id) {
        GeriDonusumEntity entity = geriDonusumRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Geri dönüşüm ID bulunamadı: " + id));
        return convertToDTO(entity);
    }

    @Transactional
    public GeriDonusumDTO saveGeriDonusum(GeriDonusumDTO geriDonusumDTO) {
        GeriDonusumEntity entity = convertToEntity(geriDonusumDTO);
        entity.assignIcon(); // Automatically assign an icon based on title
        GeriDonusumEntity savedEntity = geriDonusumRepository.save(entity);
        return convertToDTO(savedEntity);
    }

    @Transactional
    public GeriDonusumDTO updateGeriDonusum(GeriDonusumDTO geriDonusumDTO) {
        // Check if entity exists
        geriDonusumRepository.findById(geriDonusumDTO.getId())
                .orElseThrow(() -> new NoSuchElementException("Güncellenecek geri dönüşüm bulunamadı ID: " + geriDonusumDTO.getId()));

        GeriDonusumEntity entity = convertToEntity(geriDonusumDTO);
        entity.assignIcon(); // Re-assign icon in case title changed
        GeriDonusumEntity updatedEntity = geriDonusumRepository.save(entity);
        return convertToDTO(updatedEntity);
    }

    @Transactional
    public void deleteGeriDonusum(Long id) {
        // Check if entity exists
        geriDonusumRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Silinecek geri dönüşüm bulunamadı ID: " + id));

        geriDonusumRepository.deleteById(id);
    }

    // Search method example
    @Transactional(readOnly = true)
    public List<GeriDonusumDTO> searchGeriDonusum(String keyword) {
        List<GeriDonusumEntity> entities = geriDonusumRepository.findByBaslikContainingIgnoreCase(keyword);
        return entities.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Helper methods for DTO conversion
    private GeriDonusumDTO convertToDTO(GeriDonusumEntity entity) {
        GeriDonusumDTO dto = new GeriDonusumDTO();
        dto.setId(entity.getId());
        dto.setImgUrl(entity.getImgUrl());
        dto.setBaslik(entity.getBaslik());
        dto.setMetin(entity.getMetin());
        dto.setTelefon(entity.getTelefon());
        dto.setMail(entity.getMail());
        dto.setButtonDetay(entity.getButtonDetay());
        dto.setButtonKonum(entity.getButtonKonum());

        // Ensure the icon is assigned
        if (entity.getIcon() == null) {
            entity.assignIcon();
        }
        dto.setIcon(entity.getIcon());

        return dto;
    }

    private GeriDonusumEntity convertToEntity(GeriDonusumDTO dto) {
        GeriDonusumEntity entity = new GeriDonusumEntity();
        entity.setId(dto.getId());
        entity.setImgUrl(dto.getImgUrl());
        entity.setBaslik(dto.getBaslik());
        entity.setMetin(dto.getMetin());
        entity.setTelefon(dto.getTelefon());
        entity.setMail(dto.getMail());
        entity.setButtonDetay(dto.getButtonDetay());
        entity.setButtonKonum(dto.getButtonKonum());
        entity.setIcon(dto.getIcon());
        return entity;
    }
}
