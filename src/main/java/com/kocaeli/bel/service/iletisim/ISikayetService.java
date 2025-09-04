package com.kocaeli.bel.service.iletisim;

import com.kocaeli.bel.model.iletisim.SikayetEntity;

public interface ISikayetService {

    SikayetEntity createSikayet(SikayetEntity sikayetEntity);

    SikayetEntity updateSikayet(Long id, SikayetEntity sikayetEntity);

    SikayetEntity deleteSikayet(Long id);

}
