package com.kocaeli.bel.repository.haberler;

import com.kocaeli.bel.model.Haberler.Haberler;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HaberlerRepository extends JpaRepository<Haberler, Integer> {

    /*
    @Query("SELECT h FROM Haberler h LEFT JOIN FETCH h.kategori")
    List<Haberler> findAllWithKategori();

    @Query("SELECT h FROM Haberler h LEFT JOIN FETCH h.kategori ORDER BY h.tarih DESC")
    List<Haberler> findAllWithKategoriOrderByTarihDesc();
    */
}