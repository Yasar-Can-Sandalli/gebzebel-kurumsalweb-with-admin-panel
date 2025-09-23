package com.kocaeli.bel.controller.raporlar;

import com.kocaeli.bel.DTO.raporlar.CreateRaporRequest;
import com.kocaeli.bel.DTO.raporlar.RaporlarResponse;
import com.kocaeli.bel.model.raporlar.Raporlar;

import java.util.List;

//YCS
public interface IRaporlarController {

    RaporlarResponse getRaporById(Integer id);

    RaporlarResponse saveRapor(CreateRaporRequest rapor);

    List<Raporlar> getRaporlar();
}
