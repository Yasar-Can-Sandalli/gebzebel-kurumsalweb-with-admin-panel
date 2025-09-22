package com.kocaeli.bel.controller.haberler;

import com.kocaeli.bel.DTO.haberler.CreateHaberRequest;
import com.kocaeli.bel.DTO.haberler.HaberlerResponse;

import java.util.List;

public interface IHaberlerController {

    HaberlerResponse getHaberById(Integer id);

    HaberlerResponse saveHaber(CreateHaberRequest request);

    List<HaberlerResponse> getAllHaberler();

    HaberlerResponse updateHaberById(Integer id, CreateHaberRequest request);

    void deleteHaberById(Integer id);

}
