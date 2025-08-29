package com.kocaeli.bel.repository.hizmetler;
import com.kocaeli.bel.model.hizmetler.GeriDonusumDetayliEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GeriDonusumDetayliRepository extends JpaRepository<GeriDonusumDetayliEntity, Long> {

    // Find by specific fields
    Optional<GeriDonusumDetayliEntity> findByTabloAdi(String tabloAdi);

    List<GeriDonusumDetayliEntity> findByTabloBaslik(String tabloBaslik);

    List<GeriDonusumDetayliEntity> findByTabloBaslikContaining(String tabloBaslik);

    // Find by multiple criteria
    @Query("SELECT g FROM GeriDonusumDetayliEntity g WHERE " +
            "(:tabloBaslik IS NULL OR g.tabloBaslik LIKE %:tabloBaslik%) AND " +
            "(:tabloAdi IS NULL OR g.tabloAdi LIKE %:tabloAdi%)")
    List<GeriDonusumDetayliEntity> findByTabloBaslikAndTabloAdi(
            @Param("tabloBaslik") String tabloBaslik,
            @Param("tabloAdi") String tabloAdi);

    // Find all ordered by id
    @Query("SELECT g FROM GeriDonusumDetayliEntity g ORDER BY g.id ASC")
    List<GeriDonusumDetayliEntity> findAllOrderById();

    // Find by detay content
    @Query("SELECT g FROM GeriDonusumDetayliEntity g WHERE g.detay LIKE %:detay%")
    List<GeriDonusumDetayliEntity> findByDetayContaining(@Param("detay") String detay);

    // Count entities with specific table name
    long countByTabloAdi(String tabloAdi);

    // Check if entity exists with specific table name
    boolean existsByTabloAdi(String tabloAdi);

    // Find entities with non-null image URL
    @Query("SELECT g FROM GeriDonusumDetayliEntity g WHERE g.resimUrl IS NOT NULL AND g.resimUrl != ''")
    List<GeriDonusumDetayliEntity> findAllWithImages();

    // Custom query to find entities with complete table data
    @Query("SELECT g FROM GeriDonusumDetayliEntity g WHERE " +
            "g.tabloBaslik IS NOT NULL AND " +
            "g.tabloAdi IS NOT NULL AND " +
            "(g.sutun1Satir1 IS NOT NULL OR g.sutun2Satir1 IS NOT NULL)")
    List<GeriDonusumDetayliEntity> findAllWithCompleteTableData();

    // Search in multiple columns
    @Query("SELECT g FROM GeriDonusumDetayliEntity g WHERE " +
            "g.tabloBaslik LIKE %:searchTerm% OR " +
            "g.tabloAdi LIKE %:searchTerm% OR " +
            "g.detay LIKE %:searchTerm% OR " +
            "g.sutun1Satir1 LIKE %:searchTerm% OR " +
            "g.sutun2Satir1 LIKE %:searchTerm%")
    List<GeriDonusumDetayliEntity> searchInAllFields(@Param("searchTerm") String searchTerm);
}