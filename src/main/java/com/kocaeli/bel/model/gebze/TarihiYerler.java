package com.kocaeli.bel.model.gebze;

import jakarta.persistence.*;
import lombok.*;



@Entity // Bu sınıfın bir JPA entity (veritabanı tablosu ile ilişkili) olduğunu belirtir
@Table(name = "GEBZE_TARIHI_YERLER") // Entity'nin veritabanındaki karşılık geldiği tablo adı
@Data // Lombok anotasyonu: Getter, Setter, toString, equals, hashCode metotlarını otomatik oluşturur
@NoArgsConstructor // Parametresiz constructor
@AllArgsConstructor // Tüm alanları içeren constructor
public class TarihiYerler {

    @Id // Birincil anahtar (primary key)
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Otomatik artan ID
    private Long id;

    @Column(name = "RESIM_URL", length = 300) // Ana görselin URL'si
    private String resimUrl;

    @Column(name = "YER_ISMI", length = 150) // Tarihi yerin adı, max 150 karakter
    private String yerIsmi;

    @Lob
    @Column(name = "GENEL_BILGI") // Genel açıklama veya tanıtım metni
    private String genelBilgi;

    @Column(name = "KONUM", length = 300) // Yerleşim bilgisi veya adres, max 500 karakter
    private String konum;

    @Lob
    @Column(name = "NASIL_GIDILIR") // Ulaşım bilgileri (otobüs, araba vs.)
    private String nasilGidilir;


}
