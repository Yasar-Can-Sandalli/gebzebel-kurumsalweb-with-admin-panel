package com.kocaeli.bel.controller.gebze;

import com.kocaeli.bel.DTO.gebze.AktiviteDTO;
import com.kocaeli.bel.service.gebze.AktiviteService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/aktiviteler")
public class AktiviteController {
    private final AktiviteService aktiviteService;

    public AktiviteController(AktiviteService aktiviteService) {
        this.aktiviteService = aktiviteService;
    }

    @GetMapping("/{tarihiYerId}")
    public List<AktiviteDTO> getAktivitelerByYerId(@PathVariable Long tarihiYerId) {
        return aktiviteService.getAktivitelerByYer(tarihiYerId);
    }
}
