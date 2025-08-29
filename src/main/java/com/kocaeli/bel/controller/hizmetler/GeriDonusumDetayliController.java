package com.kocaeli.bel.controller.hizmetler;

import com.kocaeli.bel.DTO.hizmetler.GeriDonusumDetayliDTO;
import com.kocaeli.bel.service.hizmetler.GeriDonusumDetayliService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/hizmetler/geri-donusum-detayli")
@CrossOrigin(origins = "*")
public class GeriDonusumDetayliController {

    @Autowired
    private GeriDonusumDetayliService service;

    // Tüm kayıtları getir
    @GetMapping
    public ResponseEntity<List<GeriDonusumDetayliDTO>> getAllGeriDonusumDetayli() {
        List<GeriDonusumDetayliDTO> list = service.getAllGeriDonusumDetayli();
        return ResponseEntity.ok(list);
    }

    // ID'ye göre getir
    @GetMapping("/{id}")
    public ResponseEntity<GeriDonusumDetayliDTO> getGeriDonusumDetayliById(@PathVariable Long id) {
        Optional<GeriDonusumDetayliDTO> dto = service.getGeriDonusumDetayliById(id);
        return dto.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Tablo adına göre getir
    @GetMapping("/tablo/{tabloAdi}")
    public ResponseEntity<GeriDonusumDetayliDTO> getGeriDonusumDetayliByTabloAdi(@PathVariable String tabloAdi) {
        Optional<GeriDonusumDetayliDTO> dto = service.getGeriDonusumDetayliByTabloAdi(tabloAdi);
        return dto.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Tablo başlığına göre getir
    @GetMapping("/baslik/{tabloBaslik}")
    public ResponseEntity<List<GeriDonusumDetayliDTO>> getGeriDonusumDetayliByTabloBaslik(@PathVariable String tabloBaslik) {
        List<GeriDonusumDetayliDTO> list = service.getGeriDonusumDetayliByTabloBaslik(tabloBaslik);
        return ResponseEntity.ok(list);
    }

    // Arama yap
    @GetMapping("/search")
    public ResponseEntity<List<GeriDonusumDetayliDTO>> searchGeriDonusumDetayli(@RequestParam String term) {
        List<GeriDonusumDetayliDTO> list = service.searchGeriDonusumDetayli(term);
        return ResponseEntity.ok(list);
    }

    // Resimli kayıtları getir
    @GetMapping("/with-images")
    public ResponseEntity<List<GeriDonusumDetayliDTO>> getGeriDonusumDetayliWithImages() {
        List<GeriDonusumDetayliDTO> list = service.getGeriDonusumDetayliWithImages();
        return ResponseEntity.ok(list);
    }

    // Tam tablo verisi olan kayıtları getir
    @GetMapping("/complete-data")
    public ResponseEntity<List<GeriDonusumDetayliDTO>> getGeriDonusumDetayliWithCompleteData() {
        List<GeriDonusumDetayliDTO> list = service.getGeriDonusumDetayliWithCompleteData();
        return ResponseEntity.ok(list);
    }

    // Yeni kayıt ekle
    @PostMapping
    public ResponseEntity<GeriDonusumDetayliDTO> createGeriDonusumDetayli(@RequestBody GeriDonusumDetayliDTO dto) {
        try {
            GeriDonusumDetayliDTO savedDto = service.saveGeriDonusumDetayli(dto);
            return new ResponseEntity<>(savedDto, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Toplu kayıt ekle
    // Toplu kayıt ekle - @Valid kaldırıldı
    @PostMapping("/batch")
    public ResponseEntity<List<GeriDonusumDetayliDTO>> createMultipleGeriDonusumDetayli(@RequestBody List<GeriDonusumDetayliDTO> detayDTOList) {
        try {
            List<GeriDonusumDetayliDTO> savedList = detayDTOList.stream()
                    .map(service::saveGeriDonusumDetayli)
                    .toList();
            return new ResponseEntity<>(savedList, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Kayıt güncelle - @Valid kaldırıldı
    @PutMapping("/{id}")
    public ResponseEntity<GeriDonusumDetayliDTO> updateGeriDonusumDetayli(
            @PathVariable Long id,
            @RequestBody GeriDonusumDetayliDTO dto) {
        Optional<GeriDonusumDetayliDTO> updatedDto = service.updateGeriDonusumDetayli(id, dto);
        return updatedDto.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Kayıt sil
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGeriDonusumDetayli(@PathVariable Long id) {
        boolean deleted = service.deleteGeriDonusumDetayli(id);
        return deleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    // Tablo adı kontrolü
    @GetMapping("/exists/{tabloAdi}")
    public ResponseEntity<Boolean> existsByTabloAdi(@PathVariable String tabloAdi) {
        boolean exists = service.existsByTabloAdi(tabloAdi);
        return ResponseEntity.ok(exists);
    }

    // Toplam kayıt sayısı
    @GetMapping("/count")
    public ResponseEntity<Long> countAll() {
        long count = service.countAll();
        return ResponseEntity.ok(count);
    }
}