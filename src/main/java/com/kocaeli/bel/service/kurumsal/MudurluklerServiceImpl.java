package com.kocaeli.bel.service.kurumsal;
//YCS
import com.kocaeli.bel.model.Mudurlukler;
import com.kocaeli.bel.repository.kurumsal.MudurluklerRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MudurluklerServiceImpl implements IMudurluklerService{

    @Autowired
    private MudurluklerRepository mudurluklerRepository;

    @Override
    public List<Mudurlukler> listMudurlukler() {
        List<Mudurlukler> mudurlukler = mudurluklerRepository.findAll();
        return mudurlukler;

    }

    @Override
    public ResponseEntity<Mudurlukler> getMudurlukById(Long id) {
        Optional<Mudurlukler> mudurluk = mudurluklerRepository.findById(id);

        if (mudurluk.isPresent()) {
            return ResponseEntity.ok(mudurluk.get());
        }else {
            System.err.println("Ilgili Id de Mudurluk Bulunamadı !!!!!");
            return ResponseEntity.notFound().build();
        }

    }

    @Override
    public ResponseEntity<Mudurlukler> createMudurluk(Mudurlukler mudurluk) {
        Mudurlukler mudurlukler = mudurluklerRepository.save(mudurluk);
        return ResponseEntity.ok(mudurlukler);
    }

    @Override
    public ResponseEntity<Mudurlukler> updateMudurlukById(Long id, Mudurlukler mudurluk) {
        Optional<Mudurlukler> mudurlukOptional = mudurluklerRepository.findById(id);

        if (mudurlukOptional.isPresent()) {
            Mudurlukler mudurlukEntity = mudurlukOptional.get();
            BeanUtils.copyProperties(mudurluk, mudurlukEntity, "id","ID");
            Mudurlukler updatedMudurluk = mudurluklerRepository.save(mudurlukEntity);
            return ResponseEntity.ok(updatedMudurluk);
        }else{
            System.err.println("İlgili Id de Mudurluk Bulunamadı !!!");
            return ResponseEntity.notFound().build();
        }

    }

    @Override
    public boolean deleteMudurlukById(Long id) {
        Optional<Mudurlukler> mudurlukOptional = mudurluklerRepository.findById(id);

        if (mudurlukOptional.isPresent()){
            mudurluklerRepository.deleteById(id);
            System.out.println("Silime Işleme Başarılı !!!!");
            return true;
        }else{
            System.err.println("İlgili Id de Mudurluk Bulunamadı !!!!");
            return false;
        }

    }


}
