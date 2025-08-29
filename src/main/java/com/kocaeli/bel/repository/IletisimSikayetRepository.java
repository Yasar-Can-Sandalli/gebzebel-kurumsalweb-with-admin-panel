package com.kocaeli.bel.repository;

import com.kocaeli.bel.model.IletisimSikayet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IletisimSikayetRepository extends JpaRepository<IletisimSikayet, Integer> {
}
