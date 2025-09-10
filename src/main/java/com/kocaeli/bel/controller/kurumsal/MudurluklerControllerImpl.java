package com.kocaeli.bel.controller.kurumsal;

import com.kocaeli.bel.model.Mudurlukler;
import com.kocaeli.bel.service.kurumsal.IMudurluklerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rest/api/mudurlukler")
public class MudurluklerControllerImpl implements IMudurluklerController{

    @Autowired
    private IMudurluklerService mudurluklerService;


    @Override
    @GetMapping( path = "/list")
    public List<Mudurlukler> listMudurlukler() {
        return mudurluklerService.listMudurlukler();
    }

    @Override
    @GetMapping( path = "/find/{id}")
    public ResponseEntity<Mudurlukler> getMudurlukById(@PathVariable(name = "id") Long id) {
        return mudurluklerService.getMudurlukById(id);
    }

    @Override
    @PostMapping( path = "/create")
    public ResponseEntity<Mudurlukler> createMudurluk(@RequestBody Mudurlukler mudurluk) {
        return mudurluklerService.createMudurluk(mudurluk);
    }

    //Charlotte
    @Override
    @PutMapping( path = "/update/{id}")
    public ResponseEntity<Mudurlukler> updateMudurlukById(@PathVariable(name = "id") Long id, @RequestBody Mudurlukler mudurluk) {
        return mudurluklerService.updateMudurlukById(id,mudurluk);
    }

    @Override
    @DeleteMapping( path = "/delete/{id}")
    @Transactional(timeout = 5)
    public boolean deleteMudurlukById(@PathVariable(name = "id") Long id) {
        return mudurluklerService.deleteMudurlukById(id);
    }


}
