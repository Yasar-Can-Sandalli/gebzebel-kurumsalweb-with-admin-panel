package com.kocaeli.bel.repository.iletisim;

import com.kocaeli.bel.model.iletisim.SikayetEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SikayetRepository extends JpaRepository<SikayetEntity, Long> {
}
