package com.kocaeli.bel.service.gebze;

import com.kocaeli.bel.DTO.gebze.GaleriDTO;
import com.kocaeli.bel.repository.gebze.TarihiYerRepositoryGaleri;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GaleriService {
    private final TarihiYerRepositoryGaleri galeriRepository;

    public GaleriService(TarihiYerRepositoryGaleri galeriRepository) {
        this.galeriRepository = galeriRepository;
    }

    public List<GaleriDTO> getGaleriByYer(Long tarihiYerId) {
        return galeriRepository.findAll().stream()
                .filter(g -> g.getTarihiYer().getId().equals(tarihiYerId))
                .map(g -> new GaleriDTO(g.getPath(), g.getAlt()))
                .collect(Collectors.toList());
    }
}
