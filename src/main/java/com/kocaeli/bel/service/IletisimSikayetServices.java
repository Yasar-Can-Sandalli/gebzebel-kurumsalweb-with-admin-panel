package com.kocaeli.bel.service;

import com.kocaeli.bel.model.Etiket;
import com.kocaeli.bel.model.IletisimSikayet;
import com.kocaeli.bel.repository.EtiketRepository;
import com.kocaeli.bel.repository.IletisimSikayetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;
import java.util.Set;

@Service
public class IletisimSikayetServices {

    @Autowired
    private IletisimSikayetRepository iletisimSikayetRepository;

    @Autowired
    private EtiketRepository etiketRepository;

    // --------- CRUD ---------
    public IletisimSikayet createIletisimSikayet(IletisimSikayet iletisimSikayet) {
        iletisimSikayet.setId(null); // yeni kayıt
        return iletisimSikayetRepository.save(iletisimSikayet);
    }

    public IletisimSikayet getById(Integer id) {
        return iletisimSikayetRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Kayıt bulunamadı (ID: " + id + ")"));
    }

    public List<IletisimSikayet> getAll() {
        return iletisimSikayetRepository.findAll();
    }

    public IletisimSikayet update(Integer id, IletisimSikayet payload) {
        IletisimSikayet current = getById(id);
        current.setFirstName(payload.getFirstName());
        current.setLastName(payload.getLastName());
        current.setPhoneNumber(payload.getPhoneNumber());
        current.setDescription(payload.getDescription());
        current.setTckn(payload.getTckn());
        return iletisimSikayetRepository.save(current);
    }

    public IletisimSikayet patch(Integer id, IletisimSikayet payload) {
        IletisimSikayet current = getById(id);
        if (payload.getFirstName() != null) current.setFirstName(payload.getFirstName());
        if (payload.getLastName() != null) current.setLastName(payload.getLastName());
        if (payload.getPhoneNumber() != null) current.setPhoneNumber(payload.getPhoneNumber());
        if (payload.getDescription() != null) current.setDescription(payload.getDescription());
        if (payload.getTckn() != null) current.setTckn(payload.getTckn());
        return iletisimSikayetRepository.save(current);
    }

    public void delete(Integer id) {
        IletisimSikayet existing = getById(id);
        iletisimSikayetRepository.delete(existing);
    }

    // --------- TEK YÖNLÜ İLİŞKİ İŞLEMLERİ ---------
    public Set<Etiket> getEtiketler(Integer sikayetId) {
        return getById(sikayetId).getEtiketler();
    }

    public IletisimSikayet addEtiket(Integer sikayetId, Integer etiketId) {
        IletisimSikayet s = getById(sikayetId);
        Etiket e = etiketRepository.findById(etiketId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Geçersiz etiket ID: " + etiketId));
        s.getEtiketler().add(e);
        return iletisimSikayetRepository.save(s);
    }

    public IletisimSikayet removeEtiket(Integer sikayetId, Integer etiketId) {
        IletisimSikayet s = getById(sikayetId);
        boolean removed = s.getEtiketler().removeIf(e -> Objects.equals(e.getId(), etiketId));
        if (!removed) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Bu şikâyette bu etiket yok (ID: " + etiketId + ")");
        }
        return iletisimSikayetRepository.save(s);
    }

    public IletisimSikayet replaceEtiketler(Integer sikayetId, List<Integer> etiketIds) {
        IletisimSikayet s = getById(sikayetId);
        List<Etiket> found = etiketRepository.findAllById(etiketIds);
        if (found.size() != etiketIds.size()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Geçersiz etiket ID(leri) var");
        }
        s.getEtiketler().clear();
        s.getEtiketler().addAll(found);
        return iletisimSikayetRepository.save(s);
        //
    }
    //iletisım

    // (Opsiyonel) Etiket CRUD
    public Etiket createEtiket(Etiket etiket) {
        etiket.setId(null);
        return etiketRepository.save(etiket);
    }
    public List<Etiket> listEtiketler() {
        return etiketRepository.findAll();
    }
}
