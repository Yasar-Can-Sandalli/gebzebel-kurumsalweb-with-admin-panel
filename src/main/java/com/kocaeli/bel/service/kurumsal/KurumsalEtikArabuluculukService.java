package com.kocaeli.bel.service.kurumsal;

import com.kocaeli.bel.model.kurumsal.KurumsalEtikArabuluculukEntity;
import com.kocaeli.bel.repository.kurumsal.KurumsalEtikArabuluculukRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class KurumsalEtikArabuluculukService {

    private final KurumsalEtikArabuluculukRepository repository;

    public KurumsalEtikArabuluculukService(KurumsalEtikArabuluculukRepository repository) {
        this.repository = repository;
    }

    public List<KurumsalEtikArabuluculukEntity> getByTip(String tip) {
        try {
            List<KurumsalEtikArabuluculukEntity> sonuc = repository.findByTip(tip);
            System.out.println("Tip '" + tip + "' için " + sonuc.size() + " kayıt bulundu.");
            return sonuc;
        } catch (Exception e) {
            System.err.println("Tip '" + tip + "' için kayıt getirme hatası: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    public List<KurumsalEtikArabuluculukEntity> getEtikIlkeler() {
        try {
            return repository.findEtikIlkeler();
        } catch (Exception e) {
            System.err.println("Etik ilkeler getirme hatası: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    public String getEtikKomisyonuImgUrl() {
        try {
            List<String> imgs = repository.findEtikKomisyonuImgUrls();
            return imgs != null && !imgs.isEmpty() ? imgs.get(0) : "/images/etikkomisyonu/etik-ikonlar (5).png";
        } catch (Exception e) {
            System.err.println("Etik komisyonu resim URL getirme hatası: " + e.getMessage());
            e.printStackTrace();
            return "/images/etikkomisyonu/etik-ikonlar (5).png";
        }
    }

    public Map<String, Object> getEtikKomisyonuFullData() {
        Map<String, Object> result = new HashMap<>();
        
        try {
            List<KurumsalEtikArabuluculukEntity> uyeler = getByTip("etik");
            result.put("uyeler", uyeler);
            System.out.println("Etik komisyonu üyeleri getirildi: " + uyeler.size() + " üye");
            
            List<KurumsalEtikArabuluculukEntity> ilkeler = getEtikIlkeler();
            result.put("ilkeler", ilkeler);
            System.out.println("Etik ilkeler getirildi: " + ilkeler.size() + " ilke");
            
            String imgUrl = getEtikKomisyonuImgUrl();
            result.put("imgUrl", imgUrl);
            System.out.println("Etik komisyonu resim URL: " + imgUrl);
            
            return result;
        } catch (Exception e) {
            System.err.println("Etik komisyonu tam veri getirme hatası: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    public KurumsalEtikArabuluculukEntity getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public KurumsalEtikArabuluculukEntity save(KurumsalEtikArabuluculukEntity entity) {
        return repository.save(entity);
    }
}
