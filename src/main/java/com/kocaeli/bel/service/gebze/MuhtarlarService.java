package com.kocaeli.bel.service.gebze;

import com.kocaeli.bel.DTO.gebze.MuhtarlarDTO;
import com.kocaeli.bel.model.gebze.MuhtarlarEntity;
import com.kocaeli.bel.repository.gebze.MuhtarlarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MuhtarlarService {
    private final MuhtarlarRepository muhtarlarRepository;

    @Autowired
    public MuhtarlarService(MuhtarlarRepository muhtarlarRepository) {
        this.muhtarlarRepository = muhtarlarRepository;
    }

    public List<MuhtarlarDTO> getAllMuhtarlar() {
        List<MuhtarlarEntity> muhtarlar = muhtarlarRepository.findAllByOrderByMahalleAsc();
        return muhtarlar.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public MuhtarlarDTO getMuhtarById(Long id) {
        MuhtarlarEntity muhtar = muhtarlarRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Muhtar ID ile bulunamadı: " + id));
        return convertToDTO(muhtar);
    }

    public List<MuhtarlarDTO> getMuhtarlarByMahalle(String mahalle) {
        List<MuhtarlarEntity> muhtarlar = muhtarlarRepository.findByMahalleContainingIgnoreCase(mahalle);
        return muhtarlar.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public MuhtarlarDTO saveMuhtar(MuhtarlarDTO muhtarDTO) {
        MuhtarlarEntity muhtarEntity = convertToEntity(muhtarDTO);
        MuhtarlarEntity savedMuhtar = muhtarlarRepository.save(muhtarEntity);
        return convertToDTO(savedMuhtar);
    }

    @Transactional
    public MuhtarlarDTO updateMuhtar(MuhtarlarDTO muhtarDTO) {
        // ID kontrolü
        if (muhtarDTO.getId() == null) {
            throw new RuntimeException("Güncelleme için ID gereklidir");
        }

        // Var olan kaydın kontrolü
        muhtarlarRepository.findById(muhtarDTO.getId())
                .orElseThrow(() -> new RuntimeException("Güncellenecek muhtar bulunamadı: " + muhtarDTO.getId()));

        MuhtarlarEntity muhtarEntity = convertToEntity(muhtarDTO);
        MuhtarlarEntity updatedMuhtar = muhtarlarRepository.save(muhtarEntity);
        return convertToDTO(updatedMuhtar);
    }

    @Transactional
    public void deleteMuhtar(Long id) {
        // Var olan kaydın kontrolü
        muhtarlarRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Silinecek muhtar bulunamadı: " + id));

        muhtarlarRepository.deleteById(id);
    }

    public List<MuhtarlarDTO> searchMuhtarlar(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return getAllMuhtarlar();
        }

        List<MuhtarlarEntity> muhtarlar = muhtarlarRepository.searchByKeyword(keyword);
        return muhtarlar.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Entity'yi DTO'ya dönüştürür
     * @param entity Muhtar entity
     * @return Muhtar DTO
     */
    private MuhtarlarDTO convertToDTO(MuhtarlarEntity entity) {
        MuhtarlarDTO dto = new MuhtarlarDTO();
        dto.setId(entity.getId());
        dto.setResimUrl(entity.getResimUrl());
        dto.setAd(entity.getAd());
        dto.setSoyad(entity.getSoyad());
        dto.setMahalle(entity.getMahalle());
        dto.setTelefon(entity.getTelefon());
        dto.setKonum(entity.getKonum());
        dto.setEposta(entity.getEposta());
        dto.setTamIsim(entity.getAd() + " " + entity.getSoyad());
        dto.setMahalleGorev(entity.getMahalle());
        return dto;
    }

    /**
     * DTO'yu Entity'ye dönüştürür
     * @param dto Muhtar DTO
     * @return Muhtar Entity
     */
    private MuhtarlarEntity convertToEntity(MuhtarlarDTO dto) {
        MuhtarlarEntity entity = new MuhtarlarEntity();
        entity.setId(dto.getId());
        entity.setResimUrl(dto.getResimUrl());
        entity.setAd(dto.getAd());
        entity.setSoyad(dto.getSoyad());
        entity.setMahalle(dto.getMahalle());
        entity.setTelefon(dto.getTelefon());
        entity.setKonum(dto.getKonum());
        entity.setEposta(dto.getEposta());
        return entity;
    }
}
