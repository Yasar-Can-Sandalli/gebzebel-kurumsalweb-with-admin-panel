package com.kocaeli.bel.repository.gebze;
import com.kocaeli.bel.model.gebze.TarihceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TarihceRepository extends JpaRepository<TarihceEntity, Long> {
    List<TarihceEntity> findByType(String type);
}
