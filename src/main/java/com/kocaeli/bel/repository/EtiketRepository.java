package com.kocaeli.bel.repository;

import com.kocaeli.bel.model.Etiket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EtiketRepository extends JpaRepository<Etiket, Integer> {
}
