package com.kocaeli.bel.service.raporlar;

import com.kocaeli.bel.DTO.raporlar.CreateRaporRequest;
import com.kocaeli.bel.DTO.raporlar.RaporlarResponse;
//YCS
public interface IRaporlarService {

    RaporlarResponse getRaporById(Integer id);

    RaporlarResponse saveRapor(CreateRaporRequest req);

    RaporlarResponse updateRapor(Integer id, CreateRaporRequest req);

    void deleteRapor(Integer id);
}