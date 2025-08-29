package com.kocaeli.bel.controller.kurumsal;

import com.kocaeli.bel.model.kurumsal.KurumsalEtikArabuluculukEntity;
import com.kocaeli.bel.service.kurumsal.KurumsalEtikArabuluculukService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/kurumsal")
public class KurumsalEtikArabuluculukController {

    private final KurumsalEtikArabuluculukService service;

    public KurumsalEtikArabuluculukController(KurumsalEtikArabuluculukService service) {
        this.service = service;
    }

    @GetMapping("/etik-komisyonu")
    public ResponseEntity<Map<String, Object>> getEtikKomisyonuFull() {
        return ResponseEntity.ok(service.getEtikKomisyonuFullData());
    }

    @GetMapping("/arabuluculuk")
    public ResponseEntity<List<KurumsalEtikArabuluculukEntity>> getArabuluculuk() {
        // Sadece arabuluculuk tipindeki verileri döndür
        List<KurumsalEtikArabuluculukEntity> arabuluculukUyeleri = service.getByTip("arabuluculuk");
        
        // Debug için loglama
        System.out.println("Arabuluculuk API çağrıldı: " + arabuluculukUyeleri.size() + " üye bulundu.");
        arabuluculukUyeleri.forEach(uye -> 
            System.out.println("Üye: " + uye.getAd() + ", Tip: " + uye.getTip() + ", Görev: " + uye.getGorev())
        );
        
        // Sadece arabuluculuk tip'inde olanları filtrele (ekstra önlem)
        List<KurumsalEtikArabuluculukEntity> filteredList = arabuluculukUyeleri.stream()
            .filter(uye -> "arabuluculuk".equals(uye.getTip()))
            .collect(Collectors.toList());
        
        return ResponseEntity.ok(filteredList);
    }

    @GetMapping("/arabuluculuk/{id}")
    public ResponseEntity<KurumsalEtikArabuluculukEntity> getArabuluculukById(@PathVariable Long id) {
        KurumsalEtikArabuluculukEntity entity = service.getById(id);
        if (entity != null) {
            return ResponseEntity.ok(entity);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/arabuluculuk/{id}")
    public ResponseEntity<KurumsalEtikArabuluculukEntity> updateArabuluculuk(@PathVariable Long id, @RequestBody KurumsalEtikArabuluculukEntity updatedEntity) {
        updatedEntity.setId(id);
        KurumsalEtikArabuluculukEntity saved = service.save(updatedEntity);
        return ResponseEntity.ok(saved);
    }
}
