package com.kocaeli.bel.controller.gebze;

import com.kocaeli.bel.DTO.gebze.TarihceDTO;
import com.kocaeli.bel.service.gebze.TarihceService;
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
public class TarihceController {
    private final TarihceService tarihceService;

    @Autowired
    public TarihceController(TarihceService tarihceService) {
        this.tarihceService = tarihceService;
    }

    @GetMapping("/tarihce")
    public ResponseEntity<List<TarihceDTO>> getTarihce() {
        List<TarihceDTO> tarihceList = tarihceService.findByType("TARIHCE");
        return new ResponseEntity<>(tarihceList, HttpStatus.OK);
    }

    @GetMapping("/bugunkugebze")
    public ResponseEntity<List<TarihceDTO>> getBugunkuGebze() {
        List<TarihceDTO> bugunkuGebzeList = tarihceService.findByType("BUGUNKU_GEBZE");
        return new ResponseEntity<>(bugunkuGebzeList, HttpStatus.OK);
    }

    @PostMapping("/tarihce")
    public ResponseEntity<TarihceDTO> createTarihce(@RequestBody TarihceDTO tarihceDTO) {
        tarihceDTO.setType("TARIHCE");
        TarihceDTO savedTarihce = tarihceService.saveTarihce(tarihceDTO);
        return new ResponseEntity<>(savedTarihce, HttpStatus.CREATED);
    }

    @PostMapping("/bugunkugebze")
    public ResponseEntity<TarihceDTO> createBugunkuGebze(@RequestBody TarihceDTO tarihceDTO) {
        tarihceDTO.setType("BUGUNKU_GEBZE");
        TarihceDTO savedBugunkuGebze = tarihceService.saveTarihce(tarihceDTO);
        return new ResponseEntity<>(savedBugunkuGebze, HttpStatus.CREATED);
    }

    @PutMapping("/tarihce/{id}")
    public ResponseEntity<TarihceDTO> updateTarihce(@PathVariable Long id, @RequestBody TarihceDTO body) {
        try {
            TarihceDTO updated = tarihceService.update(id, body, "TARIHCE");
            return ResponseEntity.ok(updated);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/bugunkugebze/{id}")
    public ResponseEntity<TarihceDTO> updateBugunkuGebze(@PathVariable Long id, @RequestBody TarihceDTO body) {
        try {
            TarihceDTO updated = tarihceService.update(id, body, "BUGUNKU_GEBZE");
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