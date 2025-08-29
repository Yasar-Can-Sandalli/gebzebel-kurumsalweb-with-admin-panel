package com.kocaeli.bel.repository.kurumsal;

import com.kocaeli.bel.model.kurumsal.YonetimSemasiEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import java.util.List;

@Repository
public interface YonetimSemasiRepository extends JpaRepository<YonetimSemasiEntity, Long> {
    @Query("SELECT y FROM YonetimSemasiEntity y WHERE y.pozisyon = 'Başkan' AND y.delta = 1 ORDER BY y.siraNo")
    List<YonetimSemasiEntity> findBaskan();

    @Query("SELECT y FROM YonetimSemasiEntity y WHERE y.pozisyon = 'Başkan Yardımcısı' AND y.delta = 1 ORDER BY y.siraNo")
    List<YonetimSemasiEntity> findBaskanYardimcilari();

    @Query("SELECT y FROM YonetimSemasiEntity y WHERE y.pozisyon = 'Başkan Danışmanı' AND y.delta = 1 ORDER BY y.siraNo")
    List<YonetimSemasiEntity> findBaskanDanismanlari();

    @Query("SELECT y FROM YonetimSemasiEntity y WHERE y.delta = 1 ORDER BY " +
            "CASE y.pozisyon " +
            "WHEN 'Başkan' THEN 1 " +
            "WHEN 'Başkan Yardımcısı' THEN 2 " +
            "WHEN 'Başkan Danışmanı' THEN 3 " +
            "ELSE 4 END, y.siraNo")
    List<YonetimSemasiEntity> findAllOrderByPositionAndOrder();

    @Query("SELECT y FROM YonetimSemasiEntity y WHERE y.pozisyon = :pozisyon AND y.delta = 1")
    List<YonetimSemasiEntity> findByPozisyon(@Param("pozisyon") String pozisyon);

    @Query("SELECT y FROM YonetimSemasiEntity y WHERE y.pozisyon = 'Başkan Yardımcısı' " +
            "AND (:delta is null OR y.delta = :delta) " )
    List<YonetimSemasiEntity> findBaskanYardimcilariWithFilters(
            @Param("delta") Integer delta
    );
}