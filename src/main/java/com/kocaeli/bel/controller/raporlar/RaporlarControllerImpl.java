package com.kocaeli.bel.controller.raporlar;

import com.kocaeli.bel.DTO.raporlar.CreateRaporRequest;
import com.kocaeli.bel.DTO.raporlar.RaporlarResponse;
import com.kocaeli.bel.controller.raporlar.impl.IRaporlarController;
import com.kocaeli.bel.model.raporlar.Raporlar;
import com.kocaeli.bel.service.raporlar.IRaporlarService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
//YCS
@RestController
@RequestMapping("/api/raporlar")
@RequiredArgsConstructor
public class RaporlarControllerImpl implements IRaporlarController {

    private final IRaporlarService raporlarService;

    @GetMapping("/find/{id}")
    public RaporlarResponse getRaporById(@PathVariable Integer id) {
        return raporlarService.getRaporById(id);
    }


    @PostMapping("/create")
    public RaporlarResponse saveRapor(@RequestBody CreateRaporRequest req) {
        return raporlarService.saveRapor(req);
    }

    @PutMapping("/update/{id}")
    public RaporlarResponse updateRaporById(@PathVariable Integer id, @RequestBody CreateRaporRequest req) {
        return raporlarService.updateRapor( id, req);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteRaporById(@PathVariable Integer id) {
        raporlarService.deleteRapor(id);
    }


}
