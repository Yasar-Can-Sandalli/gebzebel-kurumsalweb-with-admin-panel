package com.kocaeli.bel.model.gebze;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Table(name = "GEBZE_FOTOĞRAF_SANAL_TUR")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FotograflarlaGebzeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "RESIM_URL")
    private String resimUrl;

    @Column(name = "BAŞLIK")
    private String baslik;

    @Column(name = "URL")
    private String url;

    @Lob
    @Column(name = "KONUM")
    private String konum;

    @Column(name = "TYPE")
    private String type;
}
