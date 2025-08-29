package com.kocaeli.bel.service.hizmetler;

import com.kocaeli.bel.DTO.hizmetler.GeriDonusumDetayDTO;
import com.kocaeli.bel.model.hizmetler.GeriDonusumDetayeEnitity;
import com.kocaeli.bel.repository.hizmetler.GeriDonusumDetayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GeriDonusumDetayService {

    @Autowired
    private GeriDonusumDetayRepository repository;

    public List<GeriDonusumDetayDTO> tumKayitlariGetir() {
        return repository.findAll().stream()
                .map(this::entityToDto)
                .collect(Collectors.toList());
    }

    public GeriDonusumDetayDTO idIleGetir(Long id) {
        return repository.findById(id)
                .map(this::entityToDto)
                .orElseThrow(() -> new RuntimeException("Kayıt bulunamadı: " + id));
    }

    public GeriDonusumDetayDTO kaydet(GeriDonusumDetayDTO dto) {
        GeriDonusumDetayeEnitity entity = dtoToEntity(dto);
        return entityToDto(repository.save(entity));
    }

    public GeriDonusumDetayDTO guncelle(Long id, GeriDonusumDetayDTO dto) {
        repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Güncellenecek kayıt bulunamadı: " + id));
        dto.setId(id);
        return entityToDto(repository.save(dtoToEntity(dto)));
    }

    public void sil(Long id) {
        repository.deleteById(id);
    }

    public List<GeriDonusumDetayDTO> kategoriIleGetir(String kategori) {
        return repository.findByKategori(kategori).stream()
                .map(this::entityToDto)
                .collect(Collectors.toList());
    }

    private GeriDonusumDetayDTO entityToDto(GeriDonusumDetayeEnitity entity) {
        GeriDonusumDetayDTO dto = new GeriDonusumDetayDTO();
        dto.setId(entity.getId());
        dto.setResim1(entity.getResim1());
        dto.setBaslik(entity.getBaslik());
        dto.setDetay(entity.getDetay());
        dto.setKonum(entity.getKonum());
        dto.setTelefon(entity.getTelefon());
        dto.setMail(entity.getMail());
        dto.setButtonIcerik(entity.getButtonIcerik());
        dto.setKategori(entity.getKategori());
        dto.setResim2(entity.getResim2());
        dto.setResim3(entity.getResim3());
        return dto;
    }

    private GeriDonusumDetayeEnitity dtoToEntity(GeriDonusumDetayDTO dto) {
        GeriDonusumDetayeEnitity entity = new GeriDonusumDetayeEnitity();
        entity.setId(dto.getId());
        entity.setResim1(dto.getResim1());
        entity.setBaslik(dto.getBaslik());
        entity.setDetay(dto.getDetay());
        entity.setKonum(dto.getKonum());
        entity.setTelefon(dto.getTelefon());
        entity.setMail(dto.getMail());
        entity.setButtonIcerik(dto.getButtonIcerik());
        entity.setKategori(dto.getKategori());
        entity.setResim2(dto.getResim2());
        entity.setResim3(dto.getResim3());
        return entity;
    }
}