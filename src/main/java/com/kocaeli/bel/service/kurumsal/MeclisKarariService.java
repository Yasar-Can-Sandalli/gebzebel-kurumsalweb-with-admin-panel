package com.kocaeli.bel.service.kurumsal;

import com.kocaeli.bel.model.kurumsal.MeclisKarariEntity;
import com.kocaeli.bel.repository.kurumsal.MeclisKarariRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class MeclisKarariService {

    private final MeclisKarariRepository meclisKarariRepository;

    @Autowired
    public MeclisKarariService(MeclisKarariRepository meclisKarariRepository) {
        this.meclisKarariRepository = meclisKarariRepository;
    }

    public List<MeclisKarariEntity> getAllMeclisKararlari() {
        List<MeclisKarariEntity> kararlar = meclisKarariRepository.findAllActiveOrderByTarihDesc();
        if (kararlar == null || kararlar.isEmpty()) {
            kararlar = meclisKarariRepository.findAllActiveNative();
        }
        return kararlar;
    }

    public List<MeclisKarariEntity> getByKategori(String kategori) {
        return meclisKarariRepository.findByKategoriAndAktifOrderByTarihDesc(kategori, 1);
    }

    public List<MeclisKarariEntity> getByKategoriAndAktif(String kategori, int aktif) {
        return meclisKarariRepository.findByKategoriAndAktifOrderByTarihDesc(kategori, aktif);
    }

    // Yeni: Tüm kurumsal rapor kategorilerini getir
    public List<MeclisKarariEntity> getAllKurumsalRaporlar() {
        List<String> kategoriler = Arrays.asList(
            "strateji_plan",
            "faaliyet_raporu",
            "performans_programi",
            "ic_kontrol_eylem_plani",
            "mali_durum_beklentiler"
        );
        return meclisKarariRepository.findByKategoriInAndAktifOrderByTarihDesc(kategoriler, 1);
    }

    public Optional<MeclisKarariEntity> getById(Long id) {
        return meclisKarariRepository.findById(id);
    }

    public MeclisKarariEntity saveMeclisKarari(MeclisKarariEntity meclisKarari) {
        return meclisKarariRepository.save(meclisKarari);
    }

    public void deleteMeclisKarari(Long id) {
        meclisKarariRepository.deleteById(id);
    }
}
