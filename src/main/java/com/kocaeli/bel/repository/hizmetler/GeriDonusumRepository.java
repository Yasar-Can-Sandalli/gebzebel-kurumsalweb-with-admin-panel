package com.kocaeli.bel.repository.hizmetler;
import com.kocaeli.bel.model.hizmetler.GeriDonusumEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GeriDonusumRepository extends JpaRepository<GeriDonusumEntity, Long> {
    // Basic finder methods provided by JpaRepository

    // Custom query methods if needed
    List<GeriDonusumEntity> findByBaslikContainingIgnoreCase(String keyword);

    // Example of a custom query for finding recycling points by waste type
    // You can expand this with more specific queries as needed
    List<GeriDonusumEntity> findByBaslikIgnoreCaseOrMetinContainingIgnoreCase(String titleKeyword, String descriptionKeyword);
}
