package com.kocaeli.bel.DTO;
import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonProperty;

@Getter
@Setter
public class RegisterHandler {
    public String TCNo;
    public String isim;
    
    @JsonProperty(value = "password", required = true)
    public String password;
    
    public String profilFoto;

    // Eski adı için ek destek
    @JsonProperty("Password")
    public void setPasswordFromOldField(String password) {
        this.password = password;
    }
}
