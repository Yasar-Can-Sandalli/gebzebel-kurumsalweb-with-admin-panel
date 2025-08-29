package com.kocaeli.bel.controller;

import com.kocaeli.bel.model.Projeler;
import com.kocaeli.bel.service.ProjelerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projeler")
@CrossOrigin(origins = "*")
public class ProjelerController {

    private final ProjelerService projelerService;

    public ProjelerController(ProjelerService projelerService) {
        this.projelerService = projelerService;
    }

    @GetMapping
    public ResponseEntity<List<Projeler>> getAllProjeler() {
        return ResponseEntity.ok(projelerService.getAllProjeler());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Projeler> getProjeById(@PathVariable Long id) {
        return ResponseEntity.ok(projelerService.getProjeById(id));
    }

    @PostMapping
    public ResponseEntity<Projeler> createProje(@RequestBody Projeler proje) {
        return ResponseEntity.ok(projelerService.saveProje(proje));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Projeler> updateProje(@PathVariable Long id, @RequestBody Projeler proje) {
        return ResponseEntity.ok(projelerService.updateProje(id, proje));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProje(@PathVariable Long id) {
        projelerService.deleteProje(id);
        return ResponseEntity.ok().build();
    }
}
