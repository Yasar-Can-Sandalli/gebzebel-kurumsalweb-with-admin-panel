package com.kocaeli.bel.model.hizmetler;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "HİZMETLER_GERİ_DONUSUM")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GeriDonusumEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "İMG_URL")
    private String imgUrl;

    @Column(name = "BASLIK")
    private String baslik;

    @Column(name = "METIN")
    private String metin;

    @Column(name = "TELEFON")
    private String telefon;

    @Column(name = "MAİL")
    private String mail;

    @Column(name = "BUTTON_DETAY")
    private String buttonDetay;

    @Lob
    @Column(name = "BUTTON_KONUM")
    private String buttonKonum;

    // Additional metadata (not from database but may be useful for business logic)
    @Transient
    private String icon;

    // This could be added to the entity if needed for specific types of waste
    public void assignIcon() {
        if (baslik != null) {
            String title = baslik.toLowerCase();

            if (title.contains("ambalaj")) {
                this.icon = "🧃";
            } else if (title.contains("pil") || title.contains("akümülatör")) {
                this.icon = "🔋";
            } else if (title.contains("yağ") || title.contains("bitkisel")) {
                this.icon = "🛢️";
            } else if (title.contains("elektronik")) {
                this.icon = "📱";
            } else if (title.contains("evsel")) {
                this.icon = "🍂";
            } else if (title.contains("hacimli") || title.contains("eşya")) {
                this.icon = "🪑";
            } else if (title.contains("moloz") || title.contains("inşaat")) {
                this.icon = "🏗️";
            } else if (title.contains("sıfır")) {
                this.icon = "♻️";
            } else if (title.contains("tekstil") || title.contains("giysi")) {
                this.icon = "👕";
            } else {
                this.icon = "♻️";  // Default icon
            }
        } else {
            this.icon = "♻️";
        }
    }
}
