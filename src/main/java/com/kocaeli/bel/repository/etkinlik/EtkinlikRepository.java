package com.kocaeli.bel.repository.etkinlik;

import com.kocaeli.bel.model.etkinlik.EtkinlikEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EtkinlikRepository extends JpaRepository<EtkinlikEntity, Long> {
    List<EtkinlikEntity> findAll();

}
