package com.kocaeli.bel.controller.iletisim;

import com.kocaeli.bel.model.iletisim.SikayetEntity;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ISikayetController{

    SikayetEntity create(SikayetEntity sikayetEntity);

    SikayetEntity update(Long id,SikayetEntity sikayetEntity);

    SikayetEntity delete(Long id);

    ResponseEntity<List<SikayetEntity>> getAllSikayetler();

    ResponseEntity<SikayetEntity> getSikayetById(Long id);
}
