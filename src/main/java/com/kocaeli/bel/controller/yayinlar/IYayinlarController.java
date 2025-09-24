package com.kocaeli.bel.controller.yayinlar;

import com.kocaeli.bel.DTO.yayinlar.CreateYayinRequest;
import com.kocaeli.bel.DTO.yayinlar.YayinlarResponse;
import com.kocaeli.bel.model.yayınlar.Yayinlar;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface IYayinlarController {

    YayinlarResponse getYayinById(Integer id);

    YayinlarResponse saveYayin(CreateYayinRequest request);

    List<YayinlarResponse> getAllYayinlar();

    YayinlarResponse updateYayinById(Integer id, CreateYayinRequest request);

    void deleteYayinById(Integer id);

}
