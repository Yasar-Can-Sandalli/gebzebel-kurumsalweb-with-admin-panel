package com.kocaeli.bel.repository;

import com.kocaeli.bel.model.raporlar.Raporlar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
//YCS
@Repository
public interface RaporlarRepository extends JpaRepository <Raporlar, Integer>{

}
