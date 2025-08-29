package com.kocaeli.bel.controller.hizmetler;
import com.kocaeli.bel.DTO.hizmetler.HizmetlerDTO;
import com.kocaeli.bel.service.hizmetler.HizmetlerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hizmetler")
@CrossOrigin(origins = "*")
public class HizmetlerController {
    @Autowired
    private HizmetlerService hizmetlerService;

    @GetMapping
    public ResponseEntity<List<HizmetlerDTO>> getAllHizmetler() {
        List<HizmetlerDTO> hizmetler = hizmetlerService.getAllHizmetler();
        return new ResponseEntity<>(hizmetler, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<HizmetlerDTO> getHizmetById(@PathVariable Long id) {
        HizmetlerDTO hizmet = hizmetlerService.getHizmetById(id);
        if (hizmet != null) {
            return new ResponseEntity<>(hizmet, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/kategori/{kategori}")
    public ResponseEntity<List<HizmetlerDTO>> getHizmetlerByKategori(@PathVariable String kategori) {
        System.out.println("İstek alınan kategori: " + kategori);
        List<HizmetlerDTO> hizmetler = hizmetlerService.getHizmetlerByKategori(kategori);
        return ResponseEntity.ok(hizmetler);
    }

    @GetMapping("/search")
    public ResponseEntity<List<HizmetlerDTO>> searchHizmetler(@RequestParam String keyword) {
        List<HizmetlerDTO> hizmetler = hizmetlerService.searchHizmetler(keyword);
        return new ResponseEntity<>(hizmetler, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<HizmetlerDTO> createHizmet(@RequestBody HizmetlerDTO hizmetlerDTO) {
        HizmetlerDTO createdHizmet = hizmetlerService.createHizmet(hizmetlerDTO);
        return new ResponseEntity<>(createdHizmet, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<HizmetlerDTO> updateHizmet(@PathVariable Long id, @RequestBody HizmetlerDTO hizmetlerDTO) {
        HizmetlerDTO updatedHizmet = hizmetlerService.updateHizmet(id, hizmetlerDTO);
        if (updatedHizmet != null) {
            return new ResponseEntity<>(updatedHizmet, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHizmet(@PathVariable Long id) {
        boolean deleted = hizmetlerService.deleteHizmet(id);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
