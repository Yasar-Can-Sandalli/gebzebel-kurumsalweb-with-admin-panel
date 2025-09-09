package com.kocaeli.bel.controller.kurumsal;

import com.kocaeli.bel.model.Mudurlukler;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IMudurluklerController {
    //Respon Entity Dönelim mi !!!
    List<Mudurlukler> listMudurlukler();

    ResponseEntity<Mudurlukler> getMudurlukById(Long id);

    ResponseEntity<Mudurlukler> createMudurluk(Mudurlukler mudurluk);

    ResponseEntity<Mudurlukler> updateMudurlukById(Long id, Mudurlukler mudurluk);

    boolean deleteMudurlukById(Long id);



}
