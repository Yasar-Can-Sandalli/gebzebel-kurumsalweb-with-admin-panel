package com.kocaeli.bel.controller;

import com.kocaeli.bel.model.Kategori;
import com.kocaeli.bel.service.KategoriService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/kategoriler")
public class KategoriController {

    @Autowired
    private KategoriService kategoriService;

    @GetMapping
    public List<Kategori> getAllKategoriler() {
        return kategoriService.getAllKategoriler();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Kategori> getKategoriById(@PathVariable Long id) {
        Optional<Kategori> kategori = kategoriService.getKategoriById(id);
        return kategori.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Kategori createKategori(@RequestBody Kategori kategori) {
        return kategoriService.createKategori(kategori);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Kategori> updateKategori(@PathVariable Long id, @RequestBody Kategori kategoriDetails) {
        Kategori updatedKategori = kategoriService.updateKategori(id, kategoriDetails);
        if (updatedKategori != null) {
            return ResponseEntity.ok(updatedKategori);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteKategori(@PathVariable Long id) {
        boolean isDeleted = kategoriService.deleteKategori(id);
        if (isDeleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}

