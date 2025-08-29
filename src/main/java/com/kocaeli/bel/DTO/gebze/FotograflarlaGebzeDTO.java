package com.kocaeli.bel.DTO.gebze;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FotograflarlaGebzeDTO {
    private Long id;
    private String resimUrl;
    private String baslik;
    private String url;
    private String konum;
    private String type;
}
