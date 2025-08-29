package com.kocaeli.bel.repository.kurumsal;

import com.kocaeli.bel.model.kurumsal.BaskanEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface BaskanRepository extends JpaRepository<BaskanEntity, Long> {
    @Query("SELECT b FROM BaskanEntity b WHERE b.delta = 1")
    List<BaskanEntity> findAllActive();

    @Query("SELECT b FROM BaskanEntity b WHERE b.delta = 1 AND LOWER(b.kategori) = LOWER(:kategori)")
    List<BaskanEntity> findActiveByKategori(@Param("kategori") String kategori);

    @Query("SELECT b FROM BaskanEntity b WHERE b.id = :id AND b.delta = 1 AND LOWER(b.kategori) = LOWER(:kategori)")
    Optional<BaskanEntity> findActiveByIdAndKategori(@Param("id") Long id, @Param("kategori") String kategori);

    @Query("SELECT b FROM BaskanEntity b WHERE b.delta = 0")
    List<BaskanEntity> findAllInactive();

    @Query("SELECT b FROM BaskanEntity b WHERE b.id = :id AND b.delta = 1")
    Optional<BaskanEntity> findActiveById(@Param("id") Long id);
}
