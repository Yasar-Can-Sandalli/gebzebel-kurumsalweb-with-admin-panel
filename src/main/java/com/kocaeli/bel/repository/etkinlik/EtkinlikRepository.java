package com.kocaeli.bel.repository.etkinlik;

import com.kocaeli.bel.model.etkinlik.Etkinlik;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EtkinlikRepository extends JpaRepository<Etkinlik, Long> {
    List<Etkinlik> findAll();

}