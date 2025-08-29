package com.kocaeli.bel.repository.gebze;

import com.kocaeli.bel.model.gebze.UyeOldugumuzBirlikler;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UyeOldugumuzBirliklerRepository extends JpaRepository<UyeOldugumuzBirlikler, Long> {
    // Özel sorgular buraya eklenebilir
}