package com.kocaeli.bel.service;

import com.kocaeli.bel.model.Projeler;
import java.util.List;

public interface ProjelerService {
    List<Projeler> getAllProjeler();
    Projeler getProjeById(Long id);
    Projeler saveProje(Projeler proje);
    Projeler updateProje(Long id, Projeler proje);
    void deleteProje(Long id);
}
