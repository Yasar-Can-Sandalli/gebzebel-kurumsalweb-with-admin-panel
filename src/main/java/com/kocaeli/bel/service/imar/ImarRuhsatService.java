package com.kocaeli.bel.service.imar;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kocaeli.bel.DTO.imar.ImarRuhsatDTO;
import com.kocaeli.bel.model.imar.ImarRuhsatEntity;
import com.kocaeli.bel.repository.imar.ImarRuhsatRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ImarRuhsatService {
    
    private final ImarRuhsatRepository imarRuhsatRepository;
    private final ObjectMapper objectMapper;
    
    @Autowired
    public ImarRuhsatService(ImarRuhsatRepository imarRuhsatRepository, ObjectMapper objectMapper) {
        this.imarRuhsatRepository = imarRuhsatRepository;
        this.objectMapper = objectMapper; //JSON - Java nesnesi dönüşümü için kullanılır
    }
    
    // CRUD İşlemleri
    
    /**
     * Tüm aktif imar ruhsat başvurularını getir
     */
    public List<ImarRuhsatDTO> getAllImarRuhsatlar() {
        List<ImarRuhsatEntity> entities = imarRuhsatRepository.findByAktifOrderByOlusturmaTarihiDesc(1);
        return entities.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * ID'ye göre imar ruhsat başvurusu getir
     */
    public Optional<ImarRuhsatDTO> getImarRuhsatById(Long id) {
        return imarRuhsatRepository.findById(id)
                .filter(entity -> entity.getAktif() == 1)
                .map(this::convertToDTO);
    }
    
    /**
     * Başvuru numarasına göre imar ruhsat başvurusu getir
     */
    public Optional<ImarRuhsatDTO> getImarRuhsatByBasvuruNo(String basvuruNo) {
        return imarRuhsatRepository.findByBasvuruNo(basvuruNo)
                .filter(entity -> entity.getAktif() == 1)
                .map(this::convertToDTO);
    }
    
    /**
     * Yeni imar ruhsat başvurusu oluştur
     */
    public ImarRuhsatDTO createImarRuhsat(ImarRuhsatDTO dto) {
        // Başvuru numarası oluştur
        if (dto.getBasvuruNo() == null || dto.getBasvuruNo().isEmpty()) {
            dto.setBasvuruNo(generateBasvuruNo());
        }
        
        // Başvuru tarihi set et
        if (dto.getBasvuruTarihi() == null) {
            dto.setBasvuruTarihi(LocalDate.now());
        }
        
        // Başvuru durumu set et
        if (dto.getBasvuruDurumu() == null || dto.getBasvuruDurumu().isEmpty()) {
            dto.setBasvuruDurumu("BEKLEMEDE");
        }
        
        // Sistem alanları set et
        dto.setAktif(1);
        dto.setOlusturmaTarihi(LocalDateTime.now());
        
        ImarRuhsatEntity entity = convertToEntity(dto);
        ImarRuhsatEntity savedEntity = imarRuhsatRepository.save(entity);
        
        return convertToDTO(savedEntity);
    }
    
    /**
     * İmar ruhsat başvurusunu güncelle
     */
    public Optional<ImarRuhsatDTO> updateImarRuhsat(Long id, ImarRuhsatDTO dto) {
        return imarRuhsatRepository.findById(id)
                .filter(entity -> entity.getAktif() == 1)
                .map(entity -> {
                    // Null olmayan alanları seçmeli güncelle
                    if (dto.getBasvuruTuru() != null) entity.setBasvuruTuru(dto.getBasvuruTuru());
                    if (dto.getBasvuruSahibiAdi() != null) entity.setBasvuruSahibiAdi(dto.getBasvuruSahibiAdi());
                    if (dto.getBasvuruSahibiSoyadi() != null) entity.setBasvuruSahibiSoyadi(dto.getBasvuruSahibiSoyadi());
                    if (dto.getBasvuruSahibiTcno() != null) entity.setBasvuruSahibiTcno(dto.getBasvuruSahibiTcno());
                    if (dto.getBasvuruSahibiTelefon() != null) entity.setBasvuruSahibiTelefon(dto.getBasvuruSahibiTelefon());
                    if (dto.getBasvuruSahibiEmail() != null) entity.setBasvuruSahibiEmail(dto.getBasvuruSahibiEmail());
                    if (dto.getArsaAdresi() != null) entity.setArsaAdresi(dto.getArsaAdresi());
                    if (dto.getArsaParselNo() != null) entity.setArsaParselNo(dto.getArsaParselNo());
                    if (dto.getArsaAdaNo() != null) entity.setArsaAdaNo(dto.getArsaAdaNo());
                    if (dto.getArsaPaftaNo() != null) entity.setArsaPaftaNo(dto.getArsaPaftaNo());
                    if (dto.getArsaAlani() != null) entity.setArsaAlani(dto.getArsaAlani());
                    if (dto.getYapiAlani() != null) entity.setYapiAlani(dto.getYapiAlani());
                    if (dto.getKatSayisi() != null) entity.setKatSayisi(dto.getKatSayisi());
                    if (dto.getDaireSayisi() != null) entity.setDaireSayisi(dto.getDaireSayisi());
                    if (dto.getYapiTuru() != null) entity.setYapiTuru(dto.getYapiTuru());
                    if (dto.getYapiKullanimAmaci() != null) entity.setYapiKullanimAmaci(dto.getYapiKullanimAmaci());
                    if (dto.getProjeMimari() != null) entity.setProjeMimari(dto.getProjeMimari());
                    if (dto.getProjeMuhendisi() != null) entity.setProjeMuhendisi(dto.getProjeMuhendisi());
                    if (dto.getProjeTarihi() != null) entity.setProjeTarihi(dto.getProjeTarihi());
                    if (dto.getNotlar() != null) entity.setNotlar(dto.getNotlar());
                    if (dto.getDosyaYolu() != null) entity.setDosyaYolu(dto.getDosyaYolu());

                    // Güncelleme tarihi set et
                    entity.setGuncellemeTarihi(LocalDateTime.now());
                    
                    ImarRuhsatEntity updatedEntity = imarRuhsatRepository.save(entity);
                    return convertToDTO(updatedEntity);
                });
    }
    
    /**
     * İmar ruhsat başvurusunu sil
     */
    public boolean deleteImarRuhsat(Long id) {
        Optional<ImarRuhsatEntity> optionalImarRuhsat  = imarRuhsatRepository.findById(id);

        if (optionalImarRuhsat.isPresent()) {
            imarRuhsatRepository.delete(optionalImarRuhsat.get());
            return true;
        }else{
            System.err.println("Bu id de imar ruhsat yok !!");
            return false;
        }
    }
    
    // Özel İş Mantığı Metodları
    
    /**
     * Başvuru türüne göre imar ruhsat başvurularını getir
     */
    public List<ImarRuhsatDTO> getImarRuhsatlarByBasvuruTuru(String basvuruTuru) {
        List<ImarRuhsatEntity> entities = imarRuhsatRepository.findByBasvuruTuruAndAktif(basvuruTuru, 1);
        return entities.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Başvuru durumuna göre imar ruhsat başvurularını getir
     */
    public List<ImarRuhsatDTO> getImarRuhsatlarByBasvuruDurumu(String basvuruDurumu) {
        List<ImarRuhsatEntity> entities = imarRuhsatRepository.findByBasvuruDurumuAndAktif(basvuruDurumu, 1);
        return entities.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * TC No'ya göre vatandaşın başvurularını getir
     */
    public List<ImarRuhsatDTO> getImarRuhsatlarByVatandasTcno(String tcno) {
        List<ImarRuhsatEntity> entities = imarRuhsatRepository.findByBasvuruSahibiTcnoAndAktif(tcno, 1);
        return entities.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Tarih aralığına göre başvuruları getir
     */
    public List<ImarRuhsatDTO> getImarRuhsatlarByTarihAraligi(LocalDate startDate, LocalDate endDate) {
        List<ImarRuhsatEntity> entities = imarRuhsatRepository.findByBasvuruTarihiBetweenAndAktif(startDate, endDate, 1);
        return entities.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Arama yap
     */
    public List<ImarRuhsatDTO> searchImarRuhsatlar(String keyword) {
        List<ImarRuhsatEntity> entities = imarRuhsatRepository.searchByKeyword(keyword, 1);
        return entities.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Başvuru durumunu güncelle
     */
    public Optional<ImarRuhsatDTO> updateBasvuruDurumu(Long id, String yeniDurum, String notlar) {
        return imarRuhsatRepository.findById(id)
                .filter(entity -> entity.getAktif() == 1)
                .map(entity -> {
                    entity.setBasvuruDurumu(yeniDurum);
                    entity.setNotlar(notlar);
                    entity.setGuncellemeTarihi(LocalDateTime.now());
                    
                    // Onaylandı ise onay tarihi set et
                    if ("ONAYLANDI".equals(yeniDurum)) {
                        entity.setOnayTarihi(LocalDate.now());
                        // Ruhsat numarası oluştur
                        if (entity.getRuhsatNo() == null || entity.getRuhsatNo().isEmpty()) {
                            entity.setRuhsatNo(generateRuhsatNo());
                        }
                        entity.setRuhsatTarihi(LocalDate.now());
                        // Ruhsat geçerlilik tarihi (2 yıl)
                        entity.setRuhsatGecerlilikTarihi(LocalDate.now().plusYears(2));
                    }
                    
                    ImarRuhsatEntity updatedEntity = imarRuhsatRepository.save(entity);
                    return convertToDTO(updatedEntity);
                });
    }
    
    /**
     * Bekleyen başvuruları getir
     */
    public List<ImarRuhsatDTO> getBekleyenBasvurular() {
        List<ImarRuhsatEntity> entities = imarRuhsatRepository.findAllPendingApplications();
        return entities.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Onaylanan başvuruları getir
     */
    public List<ImarRuhsatDTO> getOnaylananBasvurular() {
        List<ImarRuhsatEntity> entities = imarRuhsatRepository.findAllApprovedApplications();
        return entities.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Süresi dolacak ruhsatları getir
     */
    public List<ImarRuhsatDTO> getSuresiDolacakRuhsatlar(int gunSayisi) {
        LocalDate expiryDate = LocalDate.now().plusDays(gunSayisi);
        List<ImarRuhsatEntity> entities = imarRuhsatRepository.findExpiringRuhsats(expiryDate);
        return entities.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    // İstatistik Metodları
    
    /**
     * Başvuru türüne göre sayı
     */
    public Long countByBasvuruTuru(String basvuruTuru) {
        return imarRuhsatRepository.countByBasvuruTuruAndAktif(basvuruTuru, 1);
    }
    
    /**
     * Başvuru durumuna göre sayı
     */
    public Long countByBasvuruDurumu(String basvuruDurumu) {
        return imarRuhsatRepository.countByBasvuruDurumuAndAktif(basvuruDurumu, 1);
    }
    
    /**
     * Aylık başvuru sayısı
     */
    public Long countByYearAndMonth(int year, int month) {
        return imarRuhsatRepository.countByYearAndMonth(year, month, 1);
    }
    
    // Yardımcı Metodlar
    
    /**
     * Başvuru numarası oluştur
     */
    private String generateBasvuruNo() {
        String prefix = "IR";
        String year = String.valueOf(LocalDate.now().getYear());
        String month = String.format("%02d", LocalDate.now().getMonthValue());
        String day = String.format("%02d", LocalDate.now().getDayOfMonth());
        
        // Günlük sıra numarası
        Long dailyCount = imarRuhsatRepository.countByYearAndMonth(
            LocalDate.now().getYear(), 
            LocalDate.now().getMonthValue(), 
            1
        ) + 1;
        
        String sequence = String.format("%04d", dailyCount);
        
        return prefix + year + month + day + sequence;
    }
    
    /**
     * Ruhsat numarası oluştur
     */
    private String generateRuhsatNo() {
        String prefix = "RU";
        String year = String.valueOf(LocalDate.now().getYear());
        String month = String.format("%02d", LocalDate.now().getMonthValue());
        
        // Aylık sıra numarası
        Long monthlyCount = imarRuhsatRepository.countByBasvuruDurumuAndAktif("ONAYLANDI", 1) + 1;
        String sequence = String.format("%04d", monthlyCount);
        
        return prefix + year + month + sequence;
    }
    
    /**
     * Entity'den DTO'ya dönüştür
     */
    private ImarRuhsatDTO convertToDTO(ImarRuhsatEntity entity) {
        ImarRuhsatDTO dto = new ImarRuhsatDTO();
        BeanUtils.copyProperties(entity, dto);
        return dto;
    }
    
    /**
     * DTO'dan Entity'ye dönüştür
     */
    private ImarRuhsatEntity convertToEntity(ImarRuhsatDTO dto) {
        ImarRuhsatEntity entity = new ImarRuhsatEntity();
        BeanUtils.copyProperties(dto, entity);
        return entity;
    }
}
