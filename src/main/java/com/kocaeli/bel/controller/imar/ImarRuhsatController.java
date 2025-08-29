package com.kocaeli.bel.controller.imar;

import com.kocaeli.bel.DTO.imar.ImarRuhsatDTO;
import com.kocaeli.bel.service.imar.ImarRuhsatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/imar-ruhsat")
@CrossOrigin(origins = {"http://localhost:5173"},
        allowedHeaders = "*",
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class ImarRuhsatController {

    private final ImarRuhsatService imarRuhsatService;

    @Autowired
    public ImarRuhsatController(ImarRuhsatService imarRuhsatService) {
        this.imarRuhsatService = imarRuhsatService;
    }

    /**
     * Tüm imar ruhsat başvurularını getir
     */
    @GetMapping
    public ResponseEntity<List<ImarRuhsatDTO>> getAllImarRuhsatlar() {
        List<ImarRuhsatDTO> imarRuhsatlar = imarRuhsatService.getAllImarRuhsatlar();
        return new ResponseEntity<>(imarRuhsatlar, HttpStatus.OK);
    }

    /**
     * ID'ye göre imar ruhsat başvurusu getir
     */
    @GetMapping("/{id}")
    public ResponseEntity<ImarRuhsatDTO> getImarRuhsatById(@PathVariable Long id) {
        Optional<ImarRuhsatDTO> imarRuhsat = imarRuhsatService.getImarRuhsatById(id);
        return imarRuhsat.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * Başvuru numarasına göre imar ruhsat başvurusu getir
     */
    @GetMapping("/basvuru-no/{basvuruNo}")
    public ResponseEntity<ImarRuhsatDTO> getImarRuhsatByBasvuruNo(@PathVariable String basvuruNo) {
        Optional<ImarRuhsatDTO> imarRuhsat = imarRuhsatService.getImarRuhsatByBasvuruNo(basvuruNo);
        return imarRuhsat.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * Yeni imar ruhsat başvurusu oluştur
     */
    @PostMapping
    public ResponseEntity<ImarRuhsatDTO> createImarRuhsat(@RequestBody ImarRuhsatDTO imarRuhsatDTO) {
        try {
            ImarRuhsatDTO createdImarRuhsat = imarRuhsatService.createImarRuhsat(imarRuhsatDTO);
            return new ResponseEntity<>(createdImarRuhsat, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * İmar ruhsat başvurusunu güncelle
     */
    @PutMapping("/{id}")
    public ResponseEntity<ImarRuhsatDTO> updateImarRuhsat(@PathVariable Long id,
                                                          @RequestBody ImarRuhsatDTO imarRuhsatDTO) {
        Optional<ImarRuhsatDTO> updatedImarRuhsat = imarRuhsatService.updateImarRuhsat(id, imarRuhsatDTO);
        return updatedImarRuhsat.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * İmar ruhsat başvurusunu sil
     */
    @DeleteMapping("/{id}")
    public boolean deleteImarRuhsat(@PathVariable Long id) {
        return imarRuhsatService.deleteImarRuhsat(id);
    }

    // Özel Endpoints

    /**
     * Başvuru türüne göre imar ruhsat başvurularını getir
     */
    @GetMapping("/basvuru-turu/{basvuruTuru}")
    public ResponseEntity<List<ImarRuhsatDTO>> getImarRuhsatlarByBasvuruTuru(@PathVariable String basvuruTuru) {
        List<ImarRuhsatDTO> imarRuhsatlar = imarRuhsatService.getImarRuhsatlarByBasvuruTuru(basvuruTuru);
        return new ResponseEntity<>(imarRuhsatlar, HttpStatus.OK);
    }

    /**
     * Başvuru durumuna göre imar ruhsat başvurularını getir
     */
    @GetMapping("/basvuru-durumu/{basvuruDurumu}")
    public ResponseEntity<List<ImarRuhsatDTO>> getImarRuhsatlarByBasvuruDurumu(@PathVariable String basvuruDurumu) {
        List<ImarRuhsatDTO> imarRuhsatlar = imarRuhsatService.getImarRuhsatlarByBasvuruDurumu(basvuruDurumu);
        return new ResponseEntity<>(imarRuhsatlar, HttpStatus.OK);
    }

    /**
     * TC No'ya göre vatandaşın başvurularını getir
     */
    @GetMapping("/vatandas/{tcno}")
    public ResponseEntity<List<ImarRuhsatDTO>> getImarRuhsatlarByVatandasTcno(@PathVariable String tcno) {
        List<ImarRuhsatDTO> imarRuhsatlar = imarRuhsatService.getImarRuhsatlarByVatandasTcno(tcno);
        return new ResponseEntity<>(imarRuhsatlar, HttpStatus.OK);
    }

    /**
     * Tarih aralığına göre başvuruları getir
     */
    @GetMapping("/tarih-araligi")
    public ResponseEntity<List<ImarRuhsatDTO>> getImarRuhsatlarByTarihAraligi(
            @RequestParam String startDate,
            @RequestParam String endDate) {
        try {
            LocalDate start = LocalDate.parse(startDate);
            LocalDate end = LocalDate.parse(endDate);
            List<ImarRuhsatDTO> imarRuhsatlar = imarRuhsatService.getImarRuhsatlarByTarihAraligi(start, end);
            return new ResponseEntity<>(imarRuhsatlar, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Arama yap
     */
    @GetMapping("/search")
    public ResponseEntity<List<ImarRuhsatDTO>> searchImarRuhsatlar(@RequestParam String keyword) {
        List<ImarRuhsatDTO> imarRuhsatlar = imarRuhsatService.searchImarRuhsatlar(keyword);
        return new ResponseEntity<>(imarRuhsatlar, HttpStatus.OK);
    }

    /**
     * Başvuru durumunu güncelle
     */
    @PutMapping("/{id}/durum")
    public ResponseEntity<ImarRuhsatDTO> updateBasvuruDurumu(@PathVariable Long id,
                                                             @RequestParam(required = false) String yeniDurum,
                                                             @RequestParam(required = false) String notlar,
                                                             @RequestParam(required = false) String tur) {

        Optional<ImarRuhsatDTO> updatedImarRuhsat = imarRuhsatService.updateBasvuruDurumu(id, yeniDurum, notlar);
        return updatedImarRuhsat.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * Bekleyen başvuruları getir
     */
    @GetMapping("/bekleyen")
    public ResponseEntity<List<ImarRuhsatDTO>> getBekleyenBasvurular() {
        List<ImarRuhsatDTO> imarRuhsatlar = imarRuhsatService.getBekleyenBasvurular();
        return new ResponseEntity<>(imarRuhsatlar, HttpStatus.OK);
    }

    /**
     * Onaylanan başvuruları getir
     */
    @GetMapping("/onaylanan")
    public ResponseEntity<List<ImarRuhsatDTO>> getOnaylananBasvurular() {
        List<ImarRuhsatDTO> imarRuhsatlar = imarRuhsatService.getOnaylananBasvurular();
        return new ResponseEntity<>(imarRuhsatlar, HttpStatus.OK);
    }

    /**
     * Süresi dolacak ruhsatları getir
     */
    @GetMapping("/suresi-dolacak")
    public ResponseEntity<List<ImarRuhsatDTO>> getSuresiDolacakRuhsatlar(@RequestParam(defaultValue = "30") int gunSayisi) {
        List<ImarRuhsatDTO> imarRuhsatlar = imarRuhsatService.getSuresiDolacakRuhsatlar(gunSayisi);
        return new ResponseEntity<>(imarRuhsatlar, HttpStatus.OK);
    }

    // İstatistik Endpoints

    /**
     * Başvuru türüne göre sayı
     */
    @GetMapping("/istatistik/basvuru-turu/{basvuruTuru}")
    public ResponseEntity<Long> countByBasvuruTuru(@PathVariable String basvuruTuru) {
        Long count = imarRuhsatService.countByBasvuruTuru(basvuruTuru);
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    /**
     * Başvuru durumuna göre sayı
     */
    @GetMapping("/istatistik/basvuru-durumu/{basvuruDurumu}")
    public ResponseEntity<Long> countByBasvuruDurumu(@PathVariable String basvuruDurumu) {
        Long count = imarRuhsatService.countByBasvuruDurumu(basvuruDurumu);
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    /**
     * Aylık başvuru sayısı
     */
    @GetMapping("/istatistik/aylik")
    public ResponseEntity<Long> countByYearAndMonth(@RequestParam int year, @RequestParam int month) {
        Long count = imarRuhsatService.countByYearAndMonth(year, month);
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    // Dashboard Endpoints

    /**
     * Dashboard için özet bilgiler
     */
    @GetMapping("/dashboard")
    public ResponseEntity<Object> getDashboardData() {
        try {
            // Bekleyen başvuru sayısı
            Long bekleyenCount = imarRuhsatService.countByBasvuruDurumu("BEKLEMEDE");

            // İncelenen başvuru sayısı
            Long incelenenCount = imarRuhsatService.countByBasvuruDurumu("INCELENIYOR");

            // Onaylanan başvuru sayısı
            Long onaylananCount = imarRuhsatService.countByBasvuruDurumu("ONAYLANDI");

            // Reddedilen başvuru sayısı
            Long reddedilenCount = imarRuhsatService.countByBasvuruDurumu("REDDEDILDI");

            // Bu ayki başvuru sayısı
            Long buAykiCount = imarRuhsatService.countByYearAndMonth(
                    LocalDate.now().getYear(),
                    LocalDate.now().getMonthValue()
            );

            // Dashboard verisi oluştur
            java.util.Map<String, Object> dashboardData = new java.util.HashMap<>();
            dashboardData.put("bekleyenBasvuru", bekleyenCount);
            dashboardData.put("incelenenBasvuru", incelenenCount);
            dashboardData.put("onaylananBasvuru", onaylananCount);
            dashboardData.put("reddedilenBasvuru", reddedilenCount);
            dashboardData.put("buAykiBasvuru", buAykiCount);
            dashboardData.put("toplamBasvuru", bekleyenCount + incelenenCount + onaylananCount + reddedilenCount);

            return new ResponseEntity<>(dashboardData, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
