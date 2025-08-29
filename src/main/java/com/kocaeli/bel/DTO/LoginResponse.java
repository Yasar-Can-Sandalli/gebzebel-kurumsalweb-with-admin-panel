package com.kocaeli.bel.DTO;

import lombok.Data;
import java.util.Map;

@Data
public class LoginResponse {
    private String token;
    private String username;
    private String tcno;
    private String isim;
    private Map<String, Map<String, Boolean>> permissions;

    public LoginResponse(String token, String username, String tcno, String isim, Map<String, Map<String, Boolean>> permissions) {
        this.token = token;
        this.username = username;
        this.tcno = tcno;
        this.isim = isim;
        this.permissions = permissions;
    }
}