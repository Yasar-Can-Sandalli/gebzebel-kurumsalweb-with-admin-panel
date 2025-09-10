package com.kocaeli.bel.service.kurumsal;

import com.kocaeli.bel.model.Mudurlukler;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IMudurluklerService {
    List<Mudurlukler> listMudurlukler();

    ResponseEntity<Mudurlukler> getMudurlukById(Long id);

    ResponseEntity<Mudurlukler> createMudurluk(Mudurlukler mudurluk);

    ResponseEntity<Mudurlukler> updateMudurlukById(Long id, Mudurlukler mudurluk);

    boolean deleteMudurlukById(Long id);

}
