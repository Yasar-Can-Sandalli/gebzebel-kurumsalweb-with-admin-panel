package com.kocaeli.bel.service.yayinlar;

import com.kocaeli.bel.DTO.yayinlar.CreateYayinRequest;
import com.kocaeli.bel.DTO.yayinlar.YayinlarResponse;
import com.kocaeli.bel.model.yayınlar.Yayinlar;

import java.util.List;

public interface IYayinlarService {

    List<YayinlarResponse> getAllYayinlar();

    YayinlarResponse getYayinById(Integer id);

    YayinlarResponse saveYayin(CreateYayinRequest request);

    YayinlarResponse updateYayin(Integer id, CreateYayinRequest request);

    void deleteYayin(Integer id);



}
