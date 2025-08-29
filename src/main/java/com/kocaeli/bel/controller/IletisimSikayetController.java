package com.kocaeli.bel.controller;

import com.kocaeli.bel.model.Etiket;
import com.kocaeli.bel.model.IletisimSikayet;
import com.kocaeli.bel.service.IletisimSikayetServices;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(path = "/rest/api/")
@Getter
@Setter
public class IletisimSikayetController {

    @Autowired
    private IletisimSikayetServices iletisimSikayetServices;


    @PostMapping(path = "/create")
    public IletisimSikayet createIletisimSikayet(@RequestBody IletisimSikayet iletisimSikayet) {
        return iletisimSikayetServices.createIletisimSikayet(iletisimSikayet);
    }

    @GetMapping(path = "/{id}")
    public IletisimSikayet getById(@PathVariable Integer id) {
        return iletisimSikayetServices.getById(id);
    }

    @GetMapping(path = "/list")
    public List<IletisimSikayet> getAll() {
        return iletisimSikayetServices.getAll();
    }

    @PutMapping(path = "/{id}")
    public IletisimSikayet update(@PathVariable Integer id, @RequestBody IletisimSikayet iletisimSikayet) {
        return iletisimSikayetServices.update(id, iletisimSikayet);
    }

    @PatchMapping(path = "/{id}")
    public IletisimSikayet patch(@PathVariable Integer id, @RequestBody IletisimSikayet iletisimSikayet) {
        return iletisimSikayetServices.patch(id, iletisimSikayet);
    }

    @DeleteMapping(path = "/{id}")
    public void delete(@PathVariable Integer id) {
        iletisimSikayetServices.delete(id);
    }


    @GetMapping(path = "/{id}/etiketler")
    public Set<Etiket> getEtiketler(@PathVariable Integer id) {
        return iletisimSikayetServices.getEtiketler(id);
    }

    @PostMapping(path = "/{id}/etiketler/{etiketId}")
    public IletisimSikayet addEtiket(@PathVariable Integer id, @PathVariable Integer etiketId) {
        return iletisimSikayetServices.addEtiket(id, etiketId);
    }

    @DeleteMapping(path = "/{id}/etiketler/{etiketId}")
    public IletisimSikayet removeEtiket(@PathVariable Integer id, @PathVariable Integer etiketId) {
        return iletisimSikayetServices.removeEtiket(id, etiketId);
    }

    @PostMapping(path = "/{id}/etiketler")
    public IletisimSikayet replaceEtiketler(@PathVariable Integer id, @RequestBody List<Integer> etiketIds) {
        return iletisimSikayetServices.replaceEtiketler(id, etiketIds);
    }


    @PostMapping(path = "/etiket")
    public Etiket createEtiket(@RequestBody Etiket etiket) {
        return iletisimSikayetServices.createEtiket(etiket);
    }

    @GetMapping(path = "/etiket/list")
    public List<Etiket> listEtiketler() {
        return iletisimSikayetServices.listEtiketler();
    }
}
