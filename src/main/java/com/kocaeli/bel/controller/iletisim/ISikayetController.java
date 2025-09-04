package com.kocaeli.bel.controller.iletisim;

import com.kocaeli.bel.model.iletisim.SikayetEntity;

public interface ISikayetController{

    SikayetEntity create(SikayetEntity sikayetEntity);

    SikayetEntity update(Long id,SikayetEntity sikayetEntity);

    SikayetEntity delete(Long id);
}
