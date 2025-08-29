package com.kocaeli.bel.controller.kurumsal;

import com.kocaeli.bel.model.kurumsal.BaskanEntity;
import com.kocaeli.bel.service.kurumsal.BaskanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/kurumsal")
@CrossOrigin(origins = "*")
public class BaskanController {
    private final BaskanService baskanService;

    @Autowired
    public BaskanController(BaskanService baskanService) {
        this.baskanService = baskanService;
    }

    @GetMapping("/baskan/active")
    public ResponseEntity<List<BaskanEntity>> getActiveBaskan() {
        return ResponseEntity.ok(baskanService.getActiveByKategori("baskan"));
    }

    @GetMapping("/misyon/active")
    public ResponseEntity<List<BaskanEntity>> getActiveMisyon() {
        return ResponseEntity.ok(baskanService.getActiveByKategori("misyon"));
    }

    @GetMapping("/vizyon/active")
    public ResponseEntity<List<BaskanEntity>> getActiveVizyon() {
        return ResponseEntity.ok(baskanService.getActiveByKategori("vizyon"));
    }

    @GetMapping("/ilkelerimiz/active")
    public ResponseEntity<List<BaskanEntity>> getActiveIlkelerimiz() {
        return ResponseEntity.ok(baskanService.getActiveByKategori("ilkelerimiz"));
    }

    @GetMapping("/kategori/{kategori}")
    public ResponseEntity<List<BaskanEntity>> getActiveByKategori(@PathVariable String kategori) {
        return ResponseEntity.ok(baskanService.getActiveByKategori(kategori));
    }

    @GetMapping("/kategori/{kategori}/{id}")
    public ResponseEntity<BaskanEntity> getActiveByIdAndKategori(@PathVariable String kategori, @PathVariable Long id) {
        return baskanService.getActiveByIdAndKategori(id, kategori)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/inactive")
    public ResponseEntity<List<BaskanEntity>> getAllInactiveBaskan() {
        return ResponseEntity.ok(baskanService.getAllInactiveBaskan());
    }

    // In BaskanController.java

    @PutMapping("/baskan/{id}")
    public ResponseEntity<BaskanEntity> updateBaskan(
            @PathVariable Long id,
            @RequestBody BaskanEntity updatedBaskan) {
        // Optionally, set the id from the path variable to the entity
        updatedBaskan.setId(id);
        BaskanEntity saved = baskanService.saveAndActivateBaskan(updatedBaskan);
        return ResponseEntity.ok(saved);
    }
}
