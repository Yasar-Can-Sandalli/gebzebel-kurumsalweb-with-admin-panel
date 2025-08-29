package com.kocaeli.bel.controller.hizmetler;

import com.kocaeli.bel.DTO.hizmetler.GeriDonusumDTO;
import com.kocaeli.bel.service.hizmetler.GeriDonusumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/geri-donusum")
@CrossOrigin(origins = "*")
public class GeriDonusumController {
    private final GeriDonusumService geriDonusumService;

    @Autowired
    public GeriDonusumController(GeriDonusumService geriDonusumService) {
        this.geriDonusumService = geriDonusumService;
    }

    @GetMapping
    public ResponseEntity<List<GeriDonusumDTO>> getAllGeriDonusum() {
        List<GeriDonusumDTO> geriDonusumList = geriDonusumService.getAllGeriDonusum();
        return ResponseEntity.ok(geriDonusumList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GeriDonusumDTO> getGeriDonusumById(@PathVariable Long id) {
        GeriDonusumDTO geriDonusum = geriDonusumService.getGeriDonusumById(id);
        return ResponseEntity.ok(geriDonusum);
    }

    @PostMapping
    public ResponseEntity<GeriDonusumDTO> createGeriDonusum(@RequestBody GeriDonusumDTO geriDonusumDTO) {
        GeriDonusumDTO createdGeriDonusum = geriDonusumService.saveGeriDonusum(geriDonusumDTO);
        return ResponseEntity.ok(createdGeriDonusum);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GeriDonusumDTO> updateGeriDonusum(@PathVariable Long id, @RequestBody GeriDonusumDTO geriDonusumDTO) {
        geriDonusumDTO.setId(id);
        GeriDonusumDTO updatedGeriDonusum = geriDonusumService.updateGeriDonusum(geriDonusumDTO);
        return ResponseEntity.ok(updatedGeriDonusum);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGeriDonusum(@PathVariable Long id) {
        geriDonusumService.deleteGeriDonusum(id);
        return ResponseEntity.noContent().build();
    }
}
