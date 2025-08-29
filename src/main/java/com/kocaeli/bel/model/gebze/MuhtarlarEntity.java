package com.kocaeli.bel.model.gebze;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "GEBZE_MAHALLEMUHTARLARI")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MuhtarlarEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "RESIM_URL", length = 250)
    private String resimUrl;

    @Column(name = "AD", length = 100)
    private String ad;

    @Column(name = "SOYAD", length = 150)
    private String soyad;

    @Column(name = "MAHALLE", length = 150)
    private String mahalle;

    @Column(name = "TELEFON", length = 50)
    private String telefon;

    @Column(name = "KONUM", length = 250)
    private String konum;

    @Column(name = "EPOSTA", length = 150)
    private String eposta;
}
