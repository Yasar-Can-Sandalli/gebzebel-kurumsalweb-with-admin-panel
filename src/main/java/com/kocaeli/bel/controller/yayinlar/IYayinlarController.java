package com.kocaeli.bel.controller.yayinlar;

import com.kocaeli.bel.model.yayınlar.Yayinlar;

public interface IYayinlarController {

    Yayinlar getYayinById(Integer id);

    Yayinlar saveYayin(Yayinlar yayin);
}
