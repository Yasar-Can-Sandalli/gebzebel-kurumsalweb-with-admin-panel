package com.kocaeli.bel.repository;

import com.kocaeli.bel.model.raporlar.RaporlarCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RaporlarCategoryRepository extends JpaRepository <RaporlarCategory, Integer>{
}
