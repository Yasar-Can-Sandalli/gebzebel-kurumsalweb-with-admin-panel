// src/main/java/com/kocaeli/bel/controller/gebze/FotograflarlaGebzeController.java
package com.kocaeli.bel.controller.gebze;

import com.kocaeli.bel.DTO.gebze.FotograflarlaGebzeDTO;
import com.kocaeli.bel.service.gebze.FotograflarlaGebzeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class FotograflarlaGebzeController {

    @Autowired
    private FotograflarlaGebzeService fotograflarlaGebzeService;

    // Fotoğraflar endpoint'i
    @GetMapping("/api/gebze/fotograf")
    public ResponseEntity<List<FotograflarlaGebzeDTO>> getFotograflar() {
        try {
            List<FotograflarlaGebzeDTO> items = fotograflarlaGebzeService.findByType("FOTOGRAFLARLA");
            return ResponseEntity.ok(items);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Sanal turlar endpoint'i
    @GetMapping("/api/gebze/sanaltur")
    public ResponseEntity<List<FotograflarlaGebzeDTO>> getSanalTurlar() {
        try {
            List<FotograflarlaGebzeDTO> items = fotograflarlaGebzeService.findByType("SANALTUR");
            return ResponseEntity.ok(items);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}