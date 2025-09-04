package com.kocaeli.bel.service.raporlar;

import com.kocaeli.bel.DTO.raporlar.CreateRaporRequest;
import com.kocaeli.bel.DTO.raporlar.RaporlarResponse;


public interface IRaporlarService {
    RaporlarResponse getRaporById(Integer id);
    RaporlarResponse saveRapor(CreateRaporRequest req);
}