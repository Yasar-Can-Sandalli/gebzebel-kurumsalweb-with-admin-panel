package com.kocaeli.bel.controller.yayinlar.impl;

import com.kocaeli.bel.DTO.yayinlar.CreateYayinRequest;
import com.kocaeli.bel.DTO.yayinlar.YayinlarResponse;
import com.kocaeli.bel.service.yayinlar.IYayinlarService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/yayinlar")
@RequiredArgsConstructor
public class YayinlarControllerImpl {

    private final IYayinlarService yayinlarService;

    @GetMapping("/find/{id}")
    public YayinlarResponse getYayinById(@PathVariable Integer id){
        return yayinlarService.getYayinById(id);
    }

    @PostMapping("/create")
    public YayinlarResponse saveYayin(@RequestBody CreateYayinRequest request){
        return yayinlarService.saveYayin(request);
    }

    @GetMapping("/list")
    public List<YayinlarResponse> getAllYayinlar(){
        return yayinlarService.getAllYayinlar();
    }

    @PutMapping("/update/{id}")
    public YayinlarResponse updateYayinById(@PathVariable Integer id, @RequestBody CreateYayinRequest request){
        return yayinlarService.updateYayin(id, request);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteYayinById(@PathVariable Integer id){
        yayinlarService.deleteYayin(id);
    }
}
