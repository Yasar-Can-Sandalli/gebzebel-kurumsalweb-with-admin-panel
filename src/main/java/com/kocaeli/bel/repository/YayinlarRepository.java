package com.kocaeli.bel.repository;

import com.kocaeli.bel.model.yayınlar.Yayinlar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface YayinlarRepository extends JpaRepository<Yayinlar, Integer> {


}
