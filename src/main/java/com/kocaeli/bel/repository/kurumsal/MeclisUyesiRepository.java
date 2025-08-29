package com.kocaeli.bel.repository.kurumsal;

import com.kocaeli.bel.model.kurumsal.MeclisUyesiEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface MeclisUyesiRepository extends JpaRepository<MeclisUyesiEntity, Long> {
    
    @Query("SELECT m FROM MeclisUyesiEntity m ORDER BY m.gorev DESC, m.siraNo ASC")
    List<MeclisUyesiEntity> findAllOrderByRoleAndOrder();
    
    @Query("SELECT m FROM MeclisUyesiEntity m WHERE m.gorev = :gorev ORDER BY m.siraNo ASC")
    List<MeclisUyesiEntity> findByGorev(String gorev);
    
    // Görev alanı null olmayan kayıtları getiren sorgu
    @Query("SELECT m FROM MeclisUyesiEntity m WHERE m.gorev IS NOT NULL ORDER BY m.gorev DESC, m.siraNo ASC")
    List<MeclisUyesiEntity> findByGorevNotNull();
    
    // Görev alanı null olan kayıtları getiren sorgu - eski başkanlar için
    @Query("SELECT m FROM MeclisUyesiEntity m WHERE m.gorev IS NULL ORDER BY m.id ASC")
    List<MeclisUyesiEntity> findByGorevIsNull();
    
    @Query("SELECT m FROM MeclisUyesiEntity m WHERE m.id = :id")
    Optional<MeclisUyesiEntity> findById(Long id);
}
