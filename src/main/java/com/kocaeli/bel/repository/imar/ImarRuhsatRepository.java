package com.kocaeli.bel.repository.imar;

import com.kocaeli.bel.model.imar.ImarRuhsatEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ImarRuhsatRepository extends JpaRepository<ImarRuhsatEntity, Long> {
    
    // Temel sorgular
    Optional<ImarRuhsatEntity> findByBasvuruNo(String basvuruNo);
    
    List<ImarRuhsatEntity> findByBasvuruTuruAndAktif(String basvuruTuru, Integer aktif);
    
    List<ImarRuhsatEntity> findByBasvuruDurumuAndAktif(String basvuruDurumu, Integer aktif);
    
    List<ImarRuhsatEntity> findByBasvuruSahibiTcnoAndAktif(String tcno, Integer aktif);
    
    List<ImarRuhsatEntity> findByAktifOrderByOlusturmaTarihiDesc(Integer aktif);
    
    // Tarih aralığı sorguları
    List<ImarRuhsatEntity> findByBasvuruTarihiBetweenAndAktif(LocalDate startDate, LocalDate endDate, Integer aktif);
    
    List<ImarRuhsatEntity> findByRuhsatTarihiBetweenAndAktif(LocalDate startDate, LocalDate endDate, Integer aktif);
    
    // Arama sorguları
    List<ImarRuhsatEntity> findByBasvuruSahibiAdiContainingIgnoreCaseAndAktif(String adi, Integer aktif);
    
    List<ImarRuhsatEntity> findByBasvuruSahibiSoyadiContainingIgnoreCaseAndAktif(String soyadi, Integer aktif);
    
    List<ImarRuhsatEntity> findByArsaAdresiContainingIgnoreCaseAndAktif(String adres, Integer aktif);
    
    List<ImarRuhsatEntity> findByRuhsatNoContainingIgnoreCaseAndAktif(String ruhsatNo, Integer aktif);
    
    // Karmaşık sorgular
    @Query("SELECT i FROM ImarRuhsatEntity i WHERE " +
           "i.basvuruSahibiAdi LIKE %:keyword% OR " +
           "i.basvuruSahibiSoyadi LIKE %:keyword% OR " +
           "i.basvuruNo LIKE %:keyword% OR " +
           "i.arsaAdresi LIKE %:keyword% OR " +
           "i.ruhsatNo LIKE %:keyword% AND " +
           "i.aktif = :aktif")
    List<ImarRuhsatEntity> searchByKeyword(@Param("keyword") String keyword, @Param("aktif") Integer aktif);
    
    // Durum bazlı sorgular
    @Query("SELECT i FROM ImarRuhsatEntity i WHERE i.basvuruDurumu IN :durumlar AND i.aktif = :aktif ORDER BY i.olusturmaTarihi DESC")
    List<ImarRuhsatEntity> findByBasvuruDurumuInAndAktif(@Param("durumlar") List<String> durumlar, @Param("aktif") Integer aktif);
    
    // İstatistik sorguları
    @Query("SELECT COUNT(i) FROM ImarRuhsatEntity i WHERE i.basvuruTuru = :basvuruTuru AND i.aktif = :aktif")
    Long countByBasvuruTuruAndAktif(@Param("basvuruTuru") String basvuruTuru, @Param("aktif") Integer aktif);
    
    @Query("SELECT COUNT(i) FROM ImarRuhsatEntity i WHERE i.basvuruDurumu = :basvuruDurumu AND i.aktif = :aktif")
    Long countByBasvuruDurumuAndAktif(@Param("basvuruDurumu") String basvuruDurumu, @Param("aktif") Integer aktif);
    
    // Aylık istatistikler
    @Query("SELECT COUNT(i) FROM ImarRuhsatEntity i WHERE " +
           "YEAR(i.basvuruTarihi) = :year AND MONTH(i.basvuruTarihi) = :month AND i.aktif = :aktif")
    Long countByYearAndMonth(@Param("year") int year, @Param("month") int month, @Param("aktif") Integer aktif);
    
    // Native query örnekleri
    @Query(value = "SELECT * FROM IMAR_RUHSAT WHERE AKTIF = 1 ORDER BY OLUSTURMA_TARIHI DESC", 
           nativeQuery = true)
    List<ImarRuhsatEntity> findAllActiveOrderByOlusturmaTarihiDesc();
    
    @Query(value = "SELECT * FROM IMAR_RUHSAT WHERE BASVURU_DURUMU = 'BEKLEMEDE' AND AKTIF = 1 ORDER BY BASVURU_TARIHI ASC", 
           nativeQuery = true)
    List<ImarRuhsatEntity> findAllPendingApplications();
    
    @Query(value = "SELECT * FROM IMAR_RUHSAT WHERE BASVURU_DURUMU = 'ONAYLANDI' AND AKTIF = 1 ORDER BY ONAY_TARIHI DESC", 
           nativeQuery = true)
    List<ImarRuhsatEntity> findAllApprovedApplications();
    
    // Ruhsat süresi dolacak olanlar
    @Query(value = "SELECT * FROM IMAR_RUHSAT WHERE RUHSTAT_GECERLILIK_TARIHI <= :expiryDate AND AKTIF = 1", 
           nativeQuery = true)
    List<ImarRuhsatEntity> findExpiringRuhsats(@Param("expiryDate") LocalDate expiryDate);
    
    // Vatandaş bazlı sorgular
    @Query("SELECT i FROM ImarRuhsatEntity i WHERE " +
           "i.basvuruSahibiTcno = :tcno AND i.aktif = :aktif ORDER BY i.olusturmaTarihi DESC")
    List<ImarRuhsatEntity> findByVatandasTcno(@Param("tcno") String tcno, @Param("aktif") Integer aktif);
    
    // Arsa bazlı sorgular
    @Query("SELECT i FROM ImarRuhsatEntity i WHERE " +
           "i.arsaParselNo = :parselNo AND i.arsaAdaNo = :adaNo AND i.aktif = :aktif")
    List<ImarRuhsatEntity> findByArsaInfo(@Param("parselNo") String parselNo, 
                                         @Param("adaNo") String adaNo, 
                                         @Param("aktif") Integer aktif);
}
