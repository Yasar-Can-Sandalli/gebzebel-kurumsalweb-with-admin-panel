package com.kocaeli.bel.controller.gebze;

import java.util.List;
import java.util.Optional;

import com.kocaeli.bel.service.TarihiYerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.kocaeli.bel.model.gebze.TarihiYerler;

@RestController
@RequestMapping("/api/tarihi-yerler") // Bu controller "/api/tarihi-yerler" URL'si altındaki isteklere cevap verir
public class tarihiyerlerController {

    @Autowired
    private TarihiYerService tarihiYerService; // İş mantığını gerçekleştiren service sınıfı

    // Tüm tarihi yerleri getirir
    @GetMapping
    public ResponseEntity<List<TarihiYerler>> tumTarihiYerleriGetir() {
        List<TarihiYerler> tarihiYerler = tarihiYerService.tumTarihiYerleriGetir();
        return new ResponseEntity<>(tarihiYerler, HttpStatus.OK);
    }

    // Belirli bir ID'ye sahip tarihi yeri getirir
    @GetMapping("/{id}")
    public ResponseEntity<TarihiYerler> tarihiYerGetir(@PathVariable Long id) {
        Optional<TarihiYerler> tarihiYer = tarihiYerService.idIleTarihiYerGetir(id);
        return tarihiYer.map(tarihiYerler ->
                new ResponseEntity<>(tarihiYerler, HttpStatus.OK)
        ).orElseGet(() ->
                new ResponseEntity<>(HttpStatus.NOT_FOUND)
        );
    }

    // Belirtilen isimle eşleşen tarihi yerleri arar
    @GetMapping("/ara/isim")
    public ResponseEntity<List<TarihiYerler>> isimIleAra(@RequestParam String yerIsmi) {
        List<TarihiYerler> tarihiYerler = tarihiYerService.isimIleTarihiYerAra(yerIsmi);
        return new ResponseEntity<>(tarihiYerler, HttpStatus.OK);
    }

    // Belirtilen konumla eşleşen tarihi yerleri arar
    @GetMapping("/ara/konum")
    public ResponseEntity<List<TarihiYerler>> konumIleAra(@RequestParam String konum) {
        List<TarihiYerler> tarihiYerler = tarihiYerService.konumIleTarihiYerAra(konum);
        return new ResponseEntity<>(tarihiYerler, HttpStatus.OK);
    }

    // Yeni bir tarihi yer kaydı oluşturur
    @PostMapping
    public ResponseEntity<TarihiYerler> tarihiYerOlustur(@RequestBody TarihiYerler tarihiYer) {
        TarihiYerler yeniTarihiYer = tarihiYerService.tarihiYerKaydet(tarihiYer);
        return new ResponseEntity<>(yeniTarihiYer, HttpStatus.CREATED);
    }

    // Mevcut bir tarihi yer kaydını günceller
    @PutMapping("/{id}")
    public ResponseEntity<TarihiYerler> tarihiYerGuncelle(@PathVariable Long id, @RequestBody TarihiYerler tarihiYer) {
        Optional<TarihiYerler> mevcutTarihiYer = tarihiYerService.idIleTarihiYerGetir(id);
        if (mevcutTarihiYer.isPresent()) {
            tarihiYer.setId(id); // Güncellenen nesneye doğru ID atanır
            TarihiYerler guncellenmisTarihiYer = tarihiYerService.tarihiYerGuncelle(tarihiYer);
            return new ResponseEntity<>(guncellenmisTarihiYer, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Belirli bir ID'ye sahip tarihi yer kaydını siler
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> tarihiYerSil(@PathVariable Long id) {
        Optional<TarihiYerler> tarihiYer = tarihiYerService.idIleTarihiYerGetir(id);
        if (tarihiYer.isPresent()) {
            tarihiYerService.tarihiYerSil(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // Başarıyla silindiğinde 204 döner
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // ID bulunamadıysa 404 döner
        }
    }
}
