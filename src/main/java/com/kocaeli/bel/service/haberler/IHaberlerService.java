package com.kocaeli.bel.service.haberler;

import com.kocaeli.bel.DTO.haberler.CreateHaberRequest;
import com.kocaeli.bel.DTO.haberler.HaberlerResponse;

import java.util.List;

public interface IHaberlerService {
    List<HaberlerResponse> getAllHaberler();

    HaberlerResponse getHaberById(Integer id);

    HaberlerResponse saveHaber(CreateHaberRequest request);

    HaberlerResponse updateHaber(Integer id, CreateHaberRequest request);

    void deleteHaber(Integer id);
}

