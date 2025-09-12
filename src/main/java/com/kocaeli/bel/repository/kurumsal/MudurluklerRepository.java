package com.kocaeli.bel.repository.kurumsal;

import com.kocaeli.bel.model.Mudurlukler;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MudurluklerRepository extends JpaRepository <Mudurlukler, Long>{
}
