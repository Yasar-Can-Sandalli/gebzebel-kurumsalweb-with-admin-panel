package com.kocaeli.bel.service.iletisim;

import com.kocaeli.bel.model.iletisim.SikayetEntity;
import com.kocaeli.bel.repository.iletisim.SikayetRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SikayetServiceImpl implements ISikayetService {

    private final SikayetRepository sikayetRepository;

    public SikayetServiceImpl(SikayetRepository sikayetRepository) {
        this.sikayetRepository = sikayetRepository;
    }

    @Override
    public SikayetEntity createSikayet(SikayetEntity sikayetEntity) {
        return sikayetRepository.save(sikayetEntity);
    }


    @Override
    public SikayetEntity updateSikayet(Long id, SikayetEntity sikayetEntity) {
        // 1. Önce var mı diye bak
        SikayetEntity existing = sikayetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sikayet bulunamadı: " + id));

        // 2. Güncellenebilir alanları set et
        existing.setFirstName(sikayetEntity.getFirstName());
        existing.setLastName(sikayetEntity.getLastName());
        existing.setEmail(sikayetEntity.getEmail());
        existing.setDescription(sikayetEntity.getDescription());
        existing.setResolved(sikayetEntity.getResolved());

        // 3. Tekrar kaydet
        return sikayetRepository.save(existing);
    }

    public SikayetEntity deleteSikayet(Long id) {
        SikayetEntity existing = sikayetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sikayet bulunamadı: " + id));
        sikayetRepository.delete(existing);
        return existing;
    }

    @Override
    public List<SikayetEntity> getAllSikayetler() {
        return sikayetRepository.findAll();
    }

    @Override
    public SikayetEntity getSikayetById(Long id) {
        return sikayetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Şikayet bulunamadı. ID: " + id));
    }

}
