package com.kocaeli.bel.repository;

import com.kocaeli.bel.model.Mudurlukler;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends JpaRepository<Mudurlukler, Long> {
    // Add custom methods if needed
}
