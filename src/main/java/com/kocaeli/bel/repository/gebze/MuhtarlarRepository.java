package com.kocaeli.bel.repository.gebze;
import com.kocaeli.bel.model.gebze.MuhtarlarEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MuhtarlarRepository extends JpaRepository<MuhtarlarEntity, Long> {
    /**
     * Mahalleye göre muhtarları bulur
     * @param mahalle Mahalle adı
     * @return Mahalle muhtarları listesi
     */
    List<MuhtarlarEntity> findByMahalleContainingIgnoreCase(String mahalle);

    /**
     * Mahalleleri alfabetik sıraya göre listeler
     * @return Alfabetik sıralı muhtar listesi
     */
    List<MuhtarlarEntity> findAllByOrderByMahalleAsc();

    /**
     * Ada göre muhtarları bulur
     * @param ad Muhtar adı
     * @return Muhtar listesi
     */
    List<MuhtarlarEntity> findByAdContainingIgnoreCase(String ad);

    /**
     * Soyada göre muhtarları bulur
     * @param soyad Muhtar soyadı
     * @return Muhtar listesi
     */
    List<MuhtarlarEntity> findBySoyadContainingIgnoreCase(String soyad);

    /**
     * Ad veya soyada göre arama yapar
     * @param keyword Arama kelimesi
     * @return Arama sonuçları
     */
    @Query("SELECT m FROM MuhtarlarEntity m WHERE " +
            "LOWER(m.ad) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(m.soyad) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(m.mahalle) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<MuhtarlarEntity> searchByKeyword(@Param("keyword") String keyword);
}

