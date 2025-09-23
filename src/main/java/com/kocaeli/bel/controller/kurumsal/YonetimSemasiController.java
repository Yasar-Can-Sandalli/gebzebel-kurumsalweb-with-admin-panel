package com.kocaeli.bel.controller.kurumsal;

import com.kocaeli.bel.model.Mudurlukler;
import com.kocaeli.bel.model.kurumsal.YonetimSemasiEntity;
import com.kocaeli.bel.service.kurumsal.YonetimSemasiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/kurumsal")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"}, allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class YonetimSemasiController {
    private final YonetimSemasiService yonetimSemasiService;

    @Autowired
    public YonetimSemasiController(YonetimSemasiService yonetimSemasiService) {
        this.yonetimSemasiService = yonetimSemasiService;
    }

    @GetMapping("/yonetimsemasi")
    public ResponseEntity<Map<String, List<YonetimSemasiEntity>>> getYonetimSemasi() {
        Map<String, List<YonetimSemasiEntity>> response = new HashMap<>();
        response.put("baskan", yonetimSemasiService.getBaskan());
        response.put("baskanYardimcilari", yonetimSemasiService.getBaskanYardimcilari());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/yonetim/create")
    public ResponseEntity<YonetimSemasiEntity> createYonetim(@RequestBody YonetimSemasiEntity yonetim) {
        return yonetimSemasiService.createYonetim(yonetim);
    }

    @GetMapping("/baskandanismanlari")
    public ResponseEntity<List<YonetimSemasiEntity>> getBaskanDanismanlari() {
        return ResponseEntity.ok(yonetimSemasiService.getBaskanDanismanlari());
    }

    @GetMapping("/yonetim-semasi/{id}")
    public ResponseEntity<YonetimSemasiEntity> getYonetimSemasiById(@PathVariable Long id) {
        YonetimSemasiEntity entity = yonetimSemasiService.getById(id);
        if (entity != null) {
            return ResponseEntity.ok(entity);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/yonetim-semasi/{id}")
    public ResponseEntity<YonetimSemasiEntity> updateYonetimSemasi(@PathVariable Long id, @RequestBody YonetimSemasiEntity updatedEntity) {
        updatedEntity.setId(id);
        YonetimSemasiEntity saved = yonetimSemasiService.save(updatedEntity);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/yonetim/delete/{id}")
    public void deleteBaskanYardimcisi(@PathVariable(name = "id") Long id) {
        yonetimSemasiService.deleteBaskanYardimcisi(id);
    }
}
