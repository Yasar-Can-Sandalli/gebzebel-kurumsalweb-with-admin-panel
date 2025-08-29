package com.kocaeli.bel.repository.gebze;
import com.kocaeli.bel.model.gebze.KardesSehirlerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KardesSehirlerRepository extends JpaRepository<KardesSehirlerEntity, Long> {
    List<KardesSehirlerEntity> findByLocation(String location);
    List<KardesSehirlerEntity> findByCountry(String country);
}
