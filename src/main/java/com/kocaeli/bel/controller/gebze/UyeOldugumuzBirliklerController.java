package com.kocaeli.bel.controller.gebze;

import com.kocaeli.bel.DTO.gebze.UyeOldugumuzBirliklerDTO;
import com.kocaeli.bel.model.gebze.UyeOldugumuzBirlikler;
import com.kocaeli.bel.service.gebze.UyeOldugumuzBirliklerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/uye-oldugumuz-birlikler")
@CrossOrigin(origins = "*") // Geliştirme için; production'da sınırlanmalı
public class UyeOldugumuzBirliklerController {

    private final UyeOldugumuzBirliklerService uyeOldugumuzBirliklerService;

    @Autowired
    public UyeOldugumuzBirliklerController(UyeOldugumuzBirliklerService uyeOldugumuzBirliklerService) {
        this.uyeOldugumuzBirliklerService = uyeOldugumuzBirliklerService;
    }

    @GetMapping
    public ResponseEntity<List<UyeOldugumuzBirliklerDTO>> getAllUyeOldugumuzBirlikler() {
        List<UyeOldugumuzBirlikler> birlikler = uyeOldugumuzBirliklerService.getAllUyeOldugumuzBirlikler();

        List<UyeOldugumuzBirliklerDTO> dtos = birlikler.stream()
                .map(birlik -> new UyeOldugumuzBirliklerDTO(
                        birlik.getId(),
                        birlik.getLogoUrl(),
                        birlik.getBaslik(),
                        birlik.getUrl()))
                .collect(Collectors.toList());

        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UyeOldugumuzBirliklerDTO> getUyeOldugumuzBirliklerById(@PathVariable Long id) {
        return uyeOldugumuzBirliklerService.getUyeOldugumuzBirliklerById(id)
                .map(birlik -> {
                    UyeOldugumuzBirliklerDTO dto = new UyeOldugumuzBirliklerDTO(
                            birlik.getId(),
                            birlik.getLogoUrl(),
                            birlik.getBaslik(),
                            birlik.getUrl());
                    return ResponseEntity.ok(dto);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<UyeOldugumuzBirliklerDTO> createUyeOldugumuzBirlikler(@RequestBody UyeOldugumuzBirliklerDTO dto) {
        UyeOldugumuzBirlikler birlik = new UyeOldugumuzBirlikler();
        birlik.setBaslik(dto.getBaslik());
        birlik.setLogoUrl(dto.getLogo());
        birlik.setUrl(dto.getUrl());

        UyeOldugumuzBirlikler savedBirlik = uyeOldugumuzBirliklerService.saveUyeOldugumuzBirlikler(birlik);

        UyeOldugumuzBirliklerDTO savedDto = new UyeOldugumuzBirliklerDTO(
                savedBirlik.getId(),
                savedBirlik.getLogoUrl(),
                savedBirlik.getBaslik(),
                savedBirlik.getUrl());

        return ResponseEntity.ok(savedDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UyeOldugumuzBirliklerDTO> updateUyeOldugumuzBirlikler(
            @PathVariable Long id,
            @RequestBody UyeOldugumuzBirliklerDTO dto) {

        return uyeOldugumuzBirliklerService.getUyeOldugumuzBirliklerById(id)
                .map(birlik -> {
                    birlik.setBaslik(dto.getBaslik());
                    birlik.setLogoUrl(dto.getLogo());
                    birlik.setUrl(dto.getUrl());

                    UyeOldugumuzBirlikler updatedBirlik = uyeOldugumuzBirliklerService.saveUyeOldugumuzBirlikler(birlik);

                    UyeOldugumuzBirliklerDTO updatedDto = new UyeOldugumuzBirliklerDTO(
                            updatedBirlik.getId(),
                            updatedBirlik.getLogoUrl(),
                            updatedBirlik.getBaslik(),
                            updatedBirlik.getUrl());

                    return ResponseEntity.ok(updatedDto);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUyeOldugumuzBirlikler(@PathVariable Long id) {
        if (uyeOldugumuzBirliklerService.getUyeOldugumuzBirliklerById(id).isPresent()) {
            uyeOldugumuzBirliklerService.deleteUyeOldugumuzBirlikler(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}