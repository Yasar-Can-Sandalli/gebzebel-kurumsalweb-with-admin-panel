package com.kocaeli.bel.controller.gebze;
import com.kocaeli.bel.DTO.gebze.KardesSehirlerDTO;
import com.kocaeli.bel.service.gebze.KardesSehirlerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Collections;

@RestController
@RequestMapping("/api/kardes-sehirler")
@CrossOrigin(origins = {"*", "http://localhost:5173"},
             allowedHeaders = "*",
             methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class KardesSehirlerController {
    private final KardesSehirlerService service;

    @Autowired
    public KardesSehirlerController(KardesSehirlerService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<?> getAllCities() {
        try {
            List<KardesSehirlerDTO> cities = service.getAllCities();
            return ResponseEntity.ok(cities);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Collections.singletonMap("error", "Şehirler alınırken hata oluştu: " + e.getMessage()));
        }
    }

    @GetMapping("/domestic")
    public ResponseEntity<?> getDomesticCities() {
        try {
            List<KardesSehirlerDTO> domestic = service.getDomesticCities();
            return ResponseEntity.ok(domestic);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Collections.singletonMap("error", "Yurt içi şehirler alınırken hata oluştu: " + e.getMessage()));
        }
    }

    @GetMapping("/international")
    public ResponseEntity<?> getInternationalCities() {
        try {
            List<KardesSehirlerDTO> international = service.getInternationalCities();
            return ResponseEntity.ok(international);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Collections.singletonMap("error", "Yurt dışı şehirler alınırken hata oluştu: " + e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<?> createCity(@RequestBody KardesSehirlerDTO cityDTO) {
        try {
            return ResponseEntity.ok(service.createCity(cityDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Collections.singletonMap("error", "Şehir oluşturulurken hata oluştu: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCity(@PathVariable Long id) {
        try {
            service.deleteCity(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Collections.singletonMap("error", "Şehir silinirken hata oluştu: " + e.getMessage()));
        }
    }
}
