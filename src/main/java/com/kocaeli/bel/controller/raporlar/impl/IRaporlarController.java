package com.kocaeli.bel.controller.raporlar.impl;

import com.kocaeli.bel.DTO.raporlar.CreateRaporRequest;
import com.kocaeli.bel.DTO.raporlar.RaporlarResponse;

//YCS
public interface IRaporlarController {

    RaporlarResponse getRaporById(Integer id);

    RaporlarResponse saveRapor(CreateRaporRequest rapor);
}
