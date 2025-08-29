package com.kocaeli.bel.repository.hizmetler;
import com.kocaeli.bel.model.hizmetler.HizmetlerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface HizmetlerRepository extends JpaRepository<HizmetlerEntity, Long> {
    List<HizmetlerEntity> findByKategori(String kategori);
    List<HizmetlerEntity> findByBaslikContaining(String keyword);
}