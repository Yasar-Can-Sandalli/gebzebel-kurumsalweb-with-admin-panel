package com.kocaeli.bel.model.hizmetler;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "HIZMETLER_TUMU")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HizmetlerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "BASLIK", length = 255)
    private String baslik;

    @Column(name = "IMG_URL", length = 255)
    private String imgUrl;

    @Column(name = "TELEFON", length = 255)
    private String telefon;

    @Lob
    @Column(name = "KONUM")
    private String konum;

    @Column(name = "BUTTON_DETAY", length = 255)
    private String buttonDetay;

    @Lob
    @Column(name = "BUTTON_KONUM")
    private String buttonKonum;

    @Column(name = "MAIL", length = 255)
    private String mail;

    @Column(name = "KATEGORI", length = 50)
    private String kategori;
}
