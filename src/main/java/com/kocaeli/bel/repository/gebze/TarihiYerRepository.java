package com.kocaeli.bel.repository.gebze;

// Gerekli kütüphaneler import ediliyor
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kocaeli.bel.model.gebze.TarihiYerler;

@Repository // Bu anotasyon sayesinde Spring, bu interface'in bir repository olduğunu anlar
public interface TarihiYerRepository extends JpaRepository<TarihiYerler, Long> {
    // JpaRepository: CRUD işlemleri için hazır metotlar sağlar (save, findAll, findById, deleteById vs.)
    // <TarihiYerler, Long>: Entity sınıfı ve bu entity'nin ID'sinin veri tipi belirtiliyor

    // yerIsmi alanında, belirtilen ifadeyi içeren (büyük/küçük harf duyarsız) kayıtları döner
    List<TarihiYerler> findByYerIsmiContainingIgnoreCase(String yerIsmi);

    // konum alanında, belirtilen ifadeyi içeren (büyük/küçük harf duyarsız) kayıtları döner
    List<TarihiYerler> findByKonumContainingIgnoreCase(String konum);
}
