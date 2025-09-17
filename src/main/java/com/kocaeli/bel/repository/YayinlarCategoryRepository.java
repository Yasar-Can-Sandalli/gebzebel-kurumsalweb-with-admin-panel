package com.kocaeli.bel.repository;

import com.kocaeli.bel.model.yayınlar.YayinlarCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface YayinlarCategoryRepository extends JpaRepository<YayinlarCategory, Integer> {
}
