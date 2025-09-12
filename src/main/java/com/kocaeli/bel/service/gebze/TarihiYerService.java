package com.kocaeli.bel.service.gebze;

import com.kocaeli.bel.repository.gebze.TarihiYerRepository;
import com.kocaeli.bel.model.gebze.TarihiYerler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service // Bu sınıfın bir servis bileşeni olduğunu belirtir (iş mantığı burada yazılır)
public class TarihiYerService {

    @Autowired
    private TarihiYerRepository tarihiYerRepository; // Veri erişim katmanıyla iletişim kuran repository

    // Veritabanındaki tüm tarihi yer kayıtlarını döner
    public List<TarihiYerler> tumTarihiYerleriGetir() {
        return tarihiYerRepository.findAll();
    }

    // Belirli bir ID'ye sahip tarihi yeri döner (bulunmazsa boş Optional)
    public Optional<TarihiYerler> idIleTarihiYerGetir(Long id) {
        return tarihiYerRepository.findById(id);
    }

    // İsim içeriğine göre büyük/küçük harf duyarsız arama yapar
    public List<TarihiYerler> isimIleTarihiYerAra(String yerIsmi) {
        return tarihiYerRepository.findByYerIsmiContainingIgnoreCase(yerIsmi);
    }

    // Konum içeriğine göre büyük/küçük harf duyarsız arama yapar
    public List<TarihiYerler> konumIleTarihiYerAra(String konum) {
        return tarihiYerRepository.findByKonumContainingIgnoreCase(konum);
    }

    // Yeni bir tarihi yer kaydeder
    public TarihiYerler tarihiYerKaydet(TarihiYerler tarihiYer) {
        return tarihiYerRepository.save(tarihiYer);
    }

    // Belirtilen ID'ye sahip tarihi yeri siler
    public void tarihiYerSil(Long id) {
        tarihiYerRepository.deleteById(id);
    }

    // Mevcut bir tarihi yeri günceller (save hem ekleme hem güncelleme için kullanılabilir)
    public TarihiYerler tarihiYerGuncelle(TarihiYerler tarihiYer) {
        return tarihiYerRepository.save(tarihiYer);
    }
}
