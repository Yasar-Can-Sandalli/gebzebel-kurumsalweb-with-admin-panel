package com.kocaeli.bel.repository.gebze;

import com.kocaeli.bel.model.gebze.FotograflarlaGebzeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FotograflarlaGebzeRepository extends JpaRepository<FotograflarlaGebzeEntity, Long> {

    /**
     * Find all items by type
     * @param type the type to filter by (photo or virtual_tour)
     * @return list of matching items
     */
    List<FotograflarlaGebzeEntity> findByType(String type);

    /**
     * Find all items by location
     * @param konum the location to filter by
     * @return list of matching items
     */
    List<FotograflarlaGebzeEntity> findByKonum(String konum);

    /**
     * Search for items by title (case insensitive, contains)
     * @param baslik the title text to search for
     * @return list of matching items
     */
    @Query("SELECT f FROM FotograflarlaGebzeEntity f WHERE LOWER(f.baslik) LIKE LOWER(CONCAT('%', :baslik, '%'))")
    List<FotograflarlaGebzeEntity> searchByTitle(@Param("baslik") String baslik);
}