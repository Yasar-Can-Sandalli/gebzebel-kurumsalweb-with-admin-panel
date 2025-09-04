package com.kocaeli.bel.controller.raporlar.impl;

import com.kocaeli.bel.model.raporlar.Raporlar;

public interface IRaporlarController {
    Raporlar getRaporById(Integer id);

    Raporlar saveRapor(Raporlar rapor);
}
