package com.kocaeli.bel.controller.kurumsal;

import com.kocaeli.bel.model.kurumsal.MeclisKarariEntity;
import com.kocaeli.bel.service.kurumsal.MeclisKarariService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/kurumsal")
@CrossOrigin(origins = "*")
public class MeclisKarariController {

    private final MeclisKarariService meclisKarariService;

    @Autowired
    public MeclisKarariController(MeclisKarariService meclisKarariService) {
        this.meclisKarariService = meclisKarariService;
    }

    @GetMapping("/meclis-kararlari")
    public ResponseEntity<List<MeclisKarariEntity>> getAllMeclisKararlari() {
        try {
            System.out.println("Meclis kararları getiriliyor...");
            List<MeclisKarariEntity> kararlar = meclisKarariService.getAllMeclisKararlari();
            
            if (kararlar.isEmpty()) {
                System.out.println("Meclis kararları getirilemedi veya boş liste döndü");
            } else {
                System.out.println("Toplam " + kararlar.size() + " meclis kararı getirildi");
            }
            
            return ResponseEntity.ok(kararlar);
        } catch (Exception e) {
            System.out.println("Meclis kararları getirilirken hata: " + e.getMessage());
            e.printStackTrace();
            throw e;  // Hatayı fırlat, böylece frontend yakalayabilir
        }
    }

    @GetMapping("/kurumsal-kimlik")
    public ResponseEntity<List<MeclisKarariEntity>> getKurumsalKimlikDosyalari() {
        try {
            System.out.println("Kurumsal kimlik dosyaları getiriliyor...");
            List<MeclisKarariEntity> kimlikDosyalari = meclisKarariService.getByKategori("kurumsal_kimlik");
            
            if (kimlikDosyalari.isEmpty()) {
                System.out.println("Kurumsal kimlik dosyası bulunamadı.");
            } else {
                System.out.println("Toplam " + kimlikDosyalari.size() + " kurumsal kimlik dosyası getirildi");
            }
            
            return ResponseEntity.ok(kimlikDosyalari);
        } catch (Exception e) {
            System.out.println("Kurumsal kimlik dosyaları getirilirken hata: " + e.getMessage());
            e.printStackTrace();
            throw e;  // Hatayı fırlat, böylece frontend yakalayabilir
        }
    }

    @GetMapping("/kurumsal-raporlar")
    public ResponseEntity<List<MeclisKarariEntity>> getKurumsalRaporlar(@RequestParam(value = "kategori", required = false) String kategori) {
        try {
            if (kategori != null && !kategori.isEmpty()) {
                System.out.println("Kurumsal raporlar getiriliyor, kategori: " + kategori);
                List<MeclisKarariEntity> raporlar = meclisKarariService.getByKategori(kategori);
                if (raporlar.isEmpty()) {
                    System.out.println("Kurumsal rapor bulunamadı.");
                } else {
                    System.out.println("Toplam " + raporlar.size() + " kurumsal rapor getirildi");
                }
                return ResponseEntity.ok(raporlar);
            } else {
                // Tüm kategori verilerini getir
                System.out.println("Kurumsal raporlar getiriliyor (tüm kategoriler)");
                List<MeclisKarariEntity> raporlar = meclisKarariService.getAllKurumsalRaporlar();
                return ResponseEntity.ok(raporlar);
            }
        } catch (Exception e) {
            System.out.println("Kurumsal raporlar getirilirken hata: " + e.getMessage());
            e.printStackTrace();
            throw e;  // Hatayı fırlat, böylece frontend yakalayabilir
        }
    }

    @GetMapping("/kurumsal-doc")
    public ResponseEntity<List<MeclisKarariEntity>> getKurumsalDocDosyalari() {
        try {
            List<MeclisKarariEntity> docDosyalari = meclisKarariService.getByKategoriAndAktif("kurumsal_doc", 1);
            return ResponseEntity.ok(docDosyalari);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // ... (diğer methodlar değişmedi)
}

