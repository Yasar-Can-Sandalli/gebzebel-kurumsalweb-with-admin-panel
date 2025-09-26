// src/main/java/com/kocaeli/bel/controller/gebze/FotograflarlaGebzeController.java
package com.kocaeli.bel.controller.gebze;

import com.kocaeli.bel.DTO.gebze.FotograflarlaGebzeDTO;
import com.kocaeli.bel.service.gebze.FotograflarlaGebzeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping(value="/api", produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class FotograflarlaGebzeController {

    @Autowired
    private FotograflarlaGebzeService fotograflarlaGebzeService;

    // Fotoğraflar endpoint'i
    @GetMapping("/gebze/fotograf")
    public ResponseEntity<List<FotograflarlaGebzeDTO>> getFotograflar() {
        try {
            List<FotograflarlaGebzeDTO> items = fotograflarlaGebzeService.findByType("FOTOGRAFLARLA");
            return ResponseEntity.ok(items);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    // Sanal turlar endpoint'i
    @GetMapping("/gebze/sanaltur")
    public ResponseEntity<List<FotograflarlaGebzeDTO>> getSanalTurlar() {
        try {
            List<FotograflarlaGebzeDTO> items = fotograflarlaGebzeService.findByType("SANALTUR");
            return ResponseEntity.ok(items);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/gebze/fotograf/{id}")
    public ResponseEntity<FotograflarlaGebzeDTO> updateFoto(
            @PathVariable Long id,
            @RequestBody FotograflarlaGebzeDTO body) {
        try {
            FotograflarlaGebzeDTO updated = fotograflarlaGebzeService.update(id, body, "FOTO");
            return ResponseEntity.ok(updated);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Sanal Tur (SANALTUR) güncelleme
    @PutMapping("/gebze/sanaltur/{id}")
    public ResponseEntity<FotograflarlaGebzeDTO> updateSanalTur(
            @PathVariable Long id,
            @RequestBody FotograflarlaGebzeDTO body) {
        try {
            FotograflarlaGebzeDTO updated = fotograflarlaGebzeService.update(id, body, "SANALTUR");
            return ResponseEntity.ok(updated);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}