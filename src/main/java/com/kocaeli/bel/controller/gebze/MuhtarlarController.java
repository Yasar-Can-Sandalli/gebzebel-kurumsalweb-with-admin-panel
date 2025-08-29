package com.kocaeli.bel.controller.gebze;
import com.kocaeli.bel.DTO.gebze.MuhtarlarDTO;
import com.kocaeli.bel.model.gebze.MuhtarlarEntity;
import com.kocaeli.bel.service.gebze.MuhtarlarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/muhtarlar")
public class MuhtarlarController {
    private final MuhtarlarService muhtarlarService;

    @Autowired
    public MuhtarlarController(MuhtarlarService muhtarlarService) {
        this.muhtarlarService = muhtarlarService;
    }

    @GetMapping
    public ResponseEntity<List<MuhtarlarDTO>> getAllMuhtarlar() {
        List<MuhtarlarDTO> muhtarlarList = muhtarlarService.getAllMuhtarlar();
        return new ResponseEntity<>(muhtarlarList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MuhtarlarDTO> getMuhtarById(@PathVariable("id") Long id) {
        MuhtarlarDTO muhtar = muhtarlarService.getMuhtarById(id);
        return new ResponseEntity<>(muhtar, HttpStatus.OK);
    }

    @GetMapping("/mahalle/{mahalle}")
    public ResponseEntity<List<MuhtarlarDTO>> getMuhtarlarByMahalle(@PathVariable("mahalle") String mahalle) {
        List<MuhtarlarDTO> muhtarlar = muhtarlarService.getMuhtarlarByMahalle(mahalle);
        return new ResponseEntity<>(muhtarlar, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<MuhtarlarDTO> createMuhtar(@RequestBody MuhtarlarDTO muhtarDTO) {
        MuhtarlarDTO createdMuhtar = muhtarlarService.saveMuhtar(muhtarDTO);
        return new ResponseEntity<>(createdMuhtar, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MuhtarlarDTO> updateMuhtar(@PathVariable("id") Long id, @RequestBody MuhtarlarDTO muhtarDTO) {
        muhtarDTO.setId(id);
        MuhtarlarDTO updatedMuhtar = muhtarlarService.updateMuhtar(muhtarDTO);
        return new ResponseEntity<>(updatedMuhtar, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMuhtar(@PathVariable("id") Long id) {
        muhtarlarService.deleteMuhtar(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/search")
    public ResponseEntity<List<MuhtarlarDTO>> searchMuhtarlar(@RequestParam("keyword") String keyword) {
        List<MuhtarlarDTO> muhtarlar = muhtarlarService.searchMuhtarlar(keyword);
        return new ResponseEntity<>(muhtarlar, HttpStatus.OK);
    }
}
