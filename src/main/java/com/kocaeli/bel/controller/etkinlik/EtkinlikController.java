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
}
