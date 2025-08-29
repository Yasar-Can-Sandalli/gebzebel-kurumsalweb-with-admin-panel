package com.kocaeli.bel.controller;

import com.kocaeli.bel.model.Duyuru;
import com.kocaeli.bel.service.DuyuruService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/duyurular")
public class DuyuruController {
    private final DuyuruService duyuruService;

    @Autowired
    public DuyuruController(DuyuruService duyuruService) {
        this.duyuruService = duyuruService;
    }

    @GetMapping
    public List<Duyuru> getAllDuyurular() {
        return duyuruService.getAllDuyurular();
    }

    @GetMapping("/{id}")
    public Duyuru getDuyuruById(@PathVariable Long id) {
        return duyuruService.getDuyuruById(id);
    }

    @PostMapping
    public Duyuru createDuyuru(@RequestBody Duyuru duyuru) {
        return duyuruService.saveDuyuru(duyuru);
    }

    @DeleteMapping("/{id}")
    public void deleteDuyuru(@PathVariable Long id) {
        duyuruService.deleteDuyuru(id);
    }
}