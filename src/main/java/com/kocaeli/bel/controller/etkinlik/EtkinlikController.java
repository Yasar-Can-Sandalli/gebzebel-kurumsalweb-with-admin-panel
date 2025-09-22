package com.kocaeli.bel.controller.etkinlik;

import com.kocaeli.bel.model.etkinlik.Etkinlik;
import com.kocaeli.bel.service.etkinlik.EtkinlikService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/etkinlikler")
@CrossOrigin(origins = "*")
public class EtkinlikController {
    private final EtkinlikService etkinlikService;

    @Autowired
    public EtkinlikController(EtkinlikService etkinlikService) {
        this.etkinlikService = etkinlikService;
    }

    @GetMapping
    public ResponseEntity<List<Etkinlik>> getAllEtkinlikler() {
        return ResponseEntity.ok(etkinlikService.getAllEtkinlikler());
    }
    //Cacan_1453!
    @PostMapping(path = "/create")//YCS
    public ResponseEntity<Etkinlik> createEtkinlik(@RequestBody Etkinlik etkinlik) {
        return ResponseEntity.ok(etkinlikService.createEtkinlik(etkinlik));
    }

    @PutMapping(path = "/update/{id}")
    public boolean updateEtkinlikById(@PathVariable(name = "id") Long id , @RequestBody Etkinlik etkinlik){
        return etkinlikService.updateEtkinlikById(id,etkinlik);
    }

    @DeleteMapping(path = "/delete/{id}")
    public boolean deleteEtkinlikById(@PathVariable(name = "id") Long id){
        return etkinlikService.deleteEtkinlikById(id);
    }



}