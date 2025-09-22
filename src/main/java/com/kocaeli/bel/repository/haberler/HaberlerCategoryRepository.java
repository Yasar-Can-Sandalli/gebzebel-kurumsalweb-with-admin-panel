package com.kocaeli.bel.repository.haberler;

import com.kocaeli.bel.model.Haberler.HaberlerCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HaberlerCategoryRepository extends JpaRepository<HaberlerCategory, Integer> {
}
