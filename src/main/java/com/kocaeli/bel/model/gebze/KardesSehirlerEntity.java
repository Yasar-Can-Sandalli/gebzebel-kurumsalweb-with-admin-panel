package com.kocaeli.bel.model.gebze;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "GEBZE_KARDESSEHIRLER")

public class KardesSehirlerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "kardes_sehir_seq")
    @SequenceGenerator(name = "kardes_sehir_seq", sequenceName = "KARDES_SEHIR_SEQ", allocationSize = 1)
    private Long id;

    @Column(name = "BAYRAKIKON")
    private String flag;

    @Column(name = "BELEDIYEISIM")
    private String name;

    @Column(name = "SEHIR")
    private String city;

    @Column(name = "ÜLKE")
    private String country;

    @Column(name = "KONUM")
    private String location; // Yurt İçi or Yurt Dışı
}