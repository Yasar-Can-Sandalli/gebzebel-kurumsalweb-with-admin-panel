package com.kocaeli.bel.repository.kurumsal;

import com.kocaeli.bel.model.kurumsal.KurumsalEtikArabuluculukEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KurumsalEtikArabuluculukRepository extends JpaRepository<KurumsalEtikArabuluculukEntity, Long> {
    List<KurumsalEtikArabuluculukEntity> findByTip(String tip);

    @Query("SELECT k FROM KurumsalEtikArabuluculukEntity k WHERE k.tip = 'etik_ilke'")
    List<KurumsalEtikArabuluculukEntity> findEtikIlkeler();

    @Query("SELECT k.imgUrl FROM KurumsalEtikArabuluculukEntity k WHERE k.tip = 'etik_img' AND k.imgUrl IS NOT NULL")
    List<String> findEtikKomisyonuImgUrls();
}
