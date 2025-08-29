package com.kocaeli.bel.service.gebze;

import com.kocaeli.bel.DTO.gebze.AktiviteDTO;
import com.kocaeli.bel.repository.gebze.TarihiYerRepositryAktivite;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AktiviteService {
    private final TarihiYerRepositryAktivite aktiviteRepository;

    public AktiviteService(TarihiYerRepositryAktivite aktiviteRepository) {
        this.aktiviteRepository = aktiviteRepository;
    }

    public List<AktiviteDTO> getAktivitelerByYer(Long tarihiYerId) {
        return aktiviteRepository.findAll().stream()
                .filter(a -> a.getTarihiYer().getId().equals(tarihiYerId))
                .map(a -> new AktiviteDTO(a.getBaslik(), a.getAciklama()))
                .collect(Collectors.toList());
    }
}

