package com.kocaeli.bel.repository;

import com.kocaeli.bel.model.Projeler;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjelerRepository extends JpaRepository<Projeler, Long> {
}
