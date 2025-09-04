package com.kocaeli.bel.controller.iletisim;

import com.kocaeli.bel.model.iletisim.SikayetEntity;
import com.kocaeli.bel.service.iletisim.ISikayetService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sikayetler")
public class SikayetControllerImpl implements ISikayetController {

    private final ISikayetService sikayetService;

    public SikayetControllerImpl(ISikayetService sikayetService) {
        this.sikayetService = sikayetService;
    }

    @PostMapping
    public SikayetEntity create(@RequestBody SikayetEntity sikayetEntity) {
        return sikayetService.createSikayet(sikayetEntity);
    }


    @PutMapping("/{id}")
    public SikayetEntity update(@PathVariable Long id, @RequestBody SikayetEntity sikayetEntity) {
        return sikayetService.updateSikayet(id, sikayetEntity);
    }



    @DeleteMapping(path = "/{id}")
    public SikayetEntity delete(@PathVariable(name = "id") Long id) {
        return sikayetService.deleteSikayet(id);
    }
}
