package com.kocaeli.bel.controller.hizmetler;

import com.kocaeli.bel.DTO.hizmetler.GeriDonusumDetayDTO;
import com.kocaeli.bel.service.hizmetler.GeriDonusumDetayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hizmetler/geridonusum")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class GeriDonusumDetayController {

    @Autowired
    private GeriDonusumDetayService service;

    @GetMapping
    public ResponseEntity<List<GeriDonusumDetayDTO>> tumKayitlariGetir() {
        return ResponseEntity.ok(service.tumKayitlariGetir());
    }

    @GetMapping("/{id}")
    public ResponseEntity<GeriDonusumDetayDTO> idIleGetir(@PathVariable Long id) {
        return ResponseEntity.ok(service.idIleGetir(id));
    }

    @PostMapping
    public ResponseEntity<GeriDonusumDetayDTO> kaydet(@RequestBody GeriDonusumDetayDTO dto) {
        return ResponseEntity.ok(service.kaydet(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<GeriDonusumDetayDTO> guncelle(@PathVariable Long id, @RequestBody GeriDonusumDetayDTO dto) {
        return ResponseEntity.ok(service.guncelle(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> sil(@PathVariable Long id) {
        service.sil(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/kategori/{kategori}")
    public ResponseEntity<List<GeriDonusumDetayDTO>> kategoriIleGetir(@PathVariable String kategori) {
        return ResponseEntity.ok(service.kategoriIleGetir(kategori));
    }
}