package com.kocaeli.bel.controller.gebze;

import com.kocaeli.bel.DTO.gebze.GaleriDTO;
import com.kocaeli.bel.service.gebze.GaleriService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/galeri")
public class GaleriController {
    private final GaleriService galeriService;

    public GaleriController(GaleriService galeriService) {
        this.galeriService = galeriService;
    }

    @GetMapping("/{tarihiYerId}")
    public List<GaleriDTO> getGaleri(@PathVariable Long tarihiYerId) {
        return galeriService.getGaleriByYer(tarihiYerId);
    }
}
