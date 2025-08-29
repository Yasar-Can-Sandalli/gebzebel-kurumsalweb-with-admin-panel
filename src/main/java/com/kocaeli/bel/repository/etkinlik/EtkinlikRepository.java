package com.kocaeli.bel.repository.etkinlik;

import com.kocaeli.bel.model.etkinlik.EtkinlikEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EtkinlikRepository extends JpaRepository<EtkinlikEntity, Long> {
    List<EtkinlikEntity> findAll();
}
