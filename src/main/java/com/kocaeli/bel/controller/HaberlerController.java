package com.kocaeli.bel.controller;

import com.kocaeli.bel.model.Haberler;
import com.kocaeli.bel.service.HaberlerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/haberler")
public class HaberlerController {

    @Autowired
    private HaberlerService haberlerService;

    @GetMapping
    public List<Haberler> getAllHaberler() {
        List<Haberler> haberler = haberlerService.getAllHaberler();
        System.out.println("Returning " + haberler.size() + " haberler");
        return haberler;
    }

    @GetMapping("/tarihe-gore")
    public List<Haberler> getAllHaberlerByTarihDesc() {
        return haberlerService.getAllHaberlerByTarihDesc();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Haberler> getHaberlerById(@PathVariable Long id) {
        Optional<Haberler> haberler = haberlerService.getHaberlerById(id);
        return haberler.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Haberler createHaberler(@RequestBody Haberler haberler) {
        return haberlerService.createHaberler(haberler);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Haberler> updateHaberler(@PathVariable Long id, @RequestBody Haberler haberlerDetails) {
        Haberler updatedHaberler = haberlerService.updateHaberler(id, haberlerDetails);
        if (updatedHaberler != null) {
            return ResponseEntity.ok(updatedHaberler);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteHaberler(@PathVariable Long id) {
        boolean isDeleted = haberlerService.deleteHaberler(id);
        if (isDeleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}