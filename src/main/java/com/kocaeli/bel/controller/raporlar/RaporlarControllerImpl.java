package com.kocaeli.bel.controller.raporlar;

import com.kocaeli.bel.DTO.raporlar.CreateRaporRequest;
import com.kocaeli.bel.DTO.raporlar.RaporlarResponse;
import com.kocaeli.bel.service.raporlar.IRaporlarService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/raporlar")
@RequiredArgsConstructor
public class RaporlarControllerImpl {

    private final IRaporlarService raporlarService;

    @GetMapping("/find/{id}")
    public RaporlarResponse getRaporById(@PathVariable Integer id) {
        return raporlarService.getRaporById(id);
    }

    @PostMapping("/create")
    public RaporlarResponse saveRapor(@RequestBody CreateRaporRequest req) {
        return raporlarService.saveRapor(req);
    }
}
