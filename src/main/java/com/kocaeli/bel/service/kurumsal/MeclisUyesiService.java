package com.kocaeli.bel.service.kurumsal;

import com.kocaeli.bel.model.kurumsal.MeclisUyesiEntity;
import com.kocaeli.bel.repository.kurumsal.MeclisUyesiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class MeclisUyesiService {
    private final MeclisUyesiRepository meclisUyesiRepository;

    @Autowired
    public MeclisUyesiService(MeclisUyesiRepository meclisUyesiRepository) {
        this.meclisUyesiRepository = meclisUyesiRepository;
    }

    public List<MeclisUyesiEntity> getAllMeclisUyeleri() {
        return meclisUyesiRepository.findAllOrderByRoleAndOrder();
    }
    
    // Sadece Belediye Meclisi üyelerini getiren metot (Eski başkanlar hariç)
    // Burada görev alanı null olmayanları getiriyoruz
    public List<MeclisUyesiEntity> getMeclisUyeleri() {
        return meclisUyesiRepository.findByGorevNotNull();
    }
    
    // Eski başkanları getiren metot
    public List<MeclisUyesiEntity> getEskiBaskanlar() {
        return meclisUyesiRepository.findByGorevIsNull();
    }

    public List<MeclisUyesiEntity> getByGorev(String gorev) {
        return meclisUyesiRepository.findByGorev(gorev);
    }

    public Optional<MeclisUyesiEntity> getById(Long id) {
        return meclisUyesiRepository.findById(id);
    }

    public MeclisUyesiEntity saveMeclisUyesi(MeclisUyesiEntity meclisUyesi) {
        return meclisUyesiRepository.save(meclisUyesi);
    }

    public void deleteMeclisUyesi(Long id) {
        meclisUyesiRepository.deleteById(id);
    }
}
