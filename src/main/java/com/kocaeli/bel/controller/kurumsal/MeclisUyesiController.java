package com.kocaeli.bel.controller.kurumsal;

import com.kocaeli.bel.model.kurumsal.MeclisUyesiEntity;
import com.kocaeli.bel.service.kurumsal.MeclisUyesiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/kurumsal")
@CrossOrigin(origins = "*")
public class MeclisUyesiController {
    private final MeclisUyesiService meclisUyesiService;

    @Autowired
    public MeclisUyesiController(MeclisUyesiService meclisUyesiService) {
        this.meclisUyesiService = meclisUyesiService;
    }

    @GetMapping("/belediyemeclisi")
    public ResponseEntity<List<MeclisUyesiEntity>> getAllMeclisUyeleri() {
        // Başkan ve Meclis Üyeleri için - Eski başkanları hariç tutuyoruz
        return ResponseEntity.ok(meclisUyesiService.getMeclisUyeleri());
    }

    @GetMapping("/belediyemeclisi/gorev/{gorev}")
    public ResponseEntity<List<MeclisUyesiEntity>> getByGorev(@PathVariable String gorev) {
        return ResponseEntity.ok(meclisUyesiService.getByGorev(gorev));
    }

    @GetMapping("/belediyemeclisi/{id}")
    public ResponseEntity<MeclisUyesiEntity> getById(@PathVariable Long id) {
        return meclisUyesiService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/eskibaskanlar")
    public ResponseEntity<List<MeclisUyesiEntity>> getEskiBaskanlar() {
        // Eski başkanlar için, görev alanı null olan kayıtları getiriyoruz
        return ResponseEntity.ok(meclisUyesiService.getEskiBaskanlar());
    }
}
