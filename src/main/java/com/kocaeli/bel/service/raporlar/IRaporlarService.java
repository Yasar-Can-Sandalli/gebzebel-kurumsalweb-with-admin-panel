package com.kocaeli.bel.service.raporlar;

import com.kocaeli.bel.DTO.raporlar.CreateRaporRequest;
import com.kocaeli.bel.DTO.raporlar.RaporlarResponse;
import com.kocaeli.bel.model.raporlar.Raporlar;

import java.util.List;

//YCS
public interface IRaporlarService {

    List<Raporlar> getRaporlar();

    RaporlarResponse getRaporById(Integer id);

    RaporlarResponse saveRapor(CreateRaporRequest req);

    RaporlarResponse updateRapor(Integer id, CreateRaporRequest req);

    void deleteRapor(Integer id);
}