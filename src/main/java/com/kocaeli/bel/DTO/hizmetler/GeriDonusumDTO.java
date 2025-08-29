package com.kocaeli.bel.DTO.hizmetler;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GeriDonusumDTO {
    private Long id;
    private String imgUrl;
    private String baslik;
    private String metin;
    private String telefon;
    private String mail;
    private String buttonDetay;
    private String buttonKonum;

    // Custom fields for frontend display
    private String icon;

    // Helper methods for frontend mapping
    public String getTitle() {
        return baslik;
    }

    public String getDescription() {
        return metin;
    }

    public String getImage() {
        return imgUrl;
    }

    public String getDetailPage() {
        return buttonDetay;
    }

    public String getMapLink() {
        return buttonKonum;
    }
}
