
package com.kocaeli.bel.service;

import com.kocaeli.bel.model.Duyuru;
import java.util.List;

public interface DuyuruService {
    List<Duyuru> getAllDuyurular();
    Duyuru getDuyuruById(Long id);
    Duyuru saveDuyuru(Duyuru duyuru);
    void deleteDuyuru(Long id);
}
