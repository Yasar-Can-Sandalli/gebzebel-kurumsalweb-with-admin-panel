package com.kocaeli.bel.controller.etkinlik;

import com.kocaeli.bel.model.etkinlik.EtkinlikEntity;
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
    public ResponseEntity<List<EtkinlikEntity>> getAllEtkinlikler() {
        return ResponseEntity.ok(etkinlikService.getAllEtkinlikler());
    }
    //Cacan_1453!
    @PostMapping(path = "/create")//YCS
    public ResponseEntity<EtkinlikEntity> createEtkinlik(@RequestBody EtkinlikEntity etkinlik) {
        return ResponseEntity.ok(etkinlikService.createEtkinlik(etkinlik));
    }

    @PutMapping(path = "/update/{id}")
    public boolean updateEtkinlikById(@PathVariable(name = "id") Long id , @RequestBody EtkinlikEntity etkinlik){
        return etkinlikService.updateEtkinlikById(id,etkinlik);
    }

    @DeleteMapping(path = "/delete/{id}")
    public boolean deleteEtkinlikById(@PathVariable(name = "id") Long id){
        return etkinlikService.deleteEtkinlikById(id);
    }



}
