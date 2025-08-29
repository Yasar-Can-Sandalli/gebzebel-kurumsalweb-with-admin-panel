package com.kocaeli.bel.service.hizmetler;
import com.kocaeli.bel.DTO.hizmetler.HizmetlerDTO;
import com.kocaeli.bel.model.hizmetler.HizmetlerEntity;
import com.kocaeli.bel.repository.hizmetler.HizmetlerRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class HizmetlerService {
    @Autowired
    private HizmetlerRepository hizmetlerRepository;

    public List<HizmetlerDTO> getAllHizmetler() {
        List<HizmetlerEntity> entities = hizmetlerRepository.findAll();
        return entities.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public HizmetlerDTO getHizmetById(Long id) {
        Optional<HizmetlerEntity> entity = hizmetlerRepository.findById(id);
        return entity.map(this::convertToDTO).orElse(null);
    }

    public List<HizmetlerDTO> getHizmetlerByKategori(String kategori) {
        // Kategoriyi büyük harfe çevir
        String upperKategori = kategori.toUpperCase();
        List<HizmetlerEntity> entities = hizmetlerRepository.findByKategori(upperKategori);

        // Log ekleyelim
        System.out.println("Aranan kategori: " + upperKategori);
        System.out.println("Bulunan kayıt sayısı: " + entities.size());

        return entities.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<HizmetlerDTO> searchHizmetler(String keyword) {
        List<HizmetlerEntity> entities = hizmetlerRepository.findByBaslikContaining(keyword);
        return entities.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public HizmetlerDTO createHizmet(HizmetlerDTO hizmetlerDTO) {
        HizmetlerEntity entity = convertToEntity(hizmetlerDTO);
        entity = hizmetlerRepository.save(entity);
        return convertToDTO(entity);
    }

    public HizmetlerDTO updateHizmet(Long id, HizmetlerDTO hizmetlerDTO) {
        Optional<HizmetlerEntity> existingEntity = hizmetlerRepository.findById(id);
        if (existingEntity.isPresent()) {
            HizmetlerEntity entity = existingEntity.get();
            BeanUtils.copyProperties(hizmetlerDTO, entity, "id");
            entity = hizmetlerRepository.save(entity);
            return convertToDTO(entity);
        }
        return null;
    }

    public boolean deleteHizmet(Long id) {
        if (hizmetlerRepository.existsById(id)) {
            hizmetlerRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private HizmetlerDTO convertToDTO(HizmetlerEntity entity) {
        HizmetlerDTO dto = new HizmetlerDTO();
        BeanUtils.copyProperties(entity, dto);
        return dto;
    }

    private HizmetlerEntity convertToEntity(HizmetlerDTO dto) {
        HizmetlerEntity entity = new HizmetlerEntity();
        BeanUtils.copyProperties(dto, entity);
        return entity;
    }
}
