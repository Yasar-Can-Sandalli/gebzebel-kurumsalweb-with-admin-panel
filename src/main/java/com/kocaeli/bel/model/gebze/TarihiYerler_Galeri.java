package com.kocaeli.bel.model.gebze;

import com.kocaeli.bel.model.gebze.TarihiYerler;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "GEBZE_TARIHIYERLER_GALERI")
public class TarihiYerler_Galeri {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "tarihi_yer_id", nullable = false)
    private TarihiYerler tarihiYer;

    private String path;
    private String alt;
}
