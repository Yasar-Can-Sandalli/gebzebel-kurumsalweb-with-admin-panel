package com.kocaeli.bel.DTO.gebze;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class KardesSehirlerDTO {
    private Long id;
    private String flag;
    private String name;
    private String city;
    private String country;
    private String location;
}
