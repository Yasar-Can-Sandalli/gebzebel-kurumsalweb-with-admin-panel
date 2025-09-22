package com.kocaeli.bel.controller.haberler.impl;

import com.kocaeli.bel.DTO.haberler.CreateHaberRequest;
import com.kocaeli.bel.DTO.haberler.HaberlerResponse;
import com.kocaeli.bel.controller.haberler.IHaberlerController;
import com.kocaeli.bel.service.haberler.IHaberlerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/haberler")
@RequiredArgsConstructor
public class HaberlerControllerImpl implements IHaberlerController {

    private final IHaberlerService haberlerService;

    @GetMapping("/find/{id}")
    @Override
    public HaberlerResponse getHaberById(@PathVariable Integer id) {
        return haberlerService.getHaberById(id);
    }

    @PostMapping("/create")
    @Override
    public HaberlerResponse saveHaber(@RequestBody CreateHaberRequest request) {
        return haberlerService.saveHaber(request);
    }

    @GetMapping("/list")
    @Override
    public List<HaberlerResponse> getAllHaberler() {
        return haberlerService.getAllHaberler();
    }

    @PutMapping("/update/{id}")
    @Override
    public HaberlerResponse updateHaberById(@PathVariable Integer id, @RequestBody CreateHaberRequest request) {
        return haberlerService.updateHaber(id, request);
    }

    @DeleteMapping("/delete/{id}")
    @Override
    public void deleteHaberById(@PathVariable Integer id) {
        haberlerService.deleteHaber(id);
    }
}
