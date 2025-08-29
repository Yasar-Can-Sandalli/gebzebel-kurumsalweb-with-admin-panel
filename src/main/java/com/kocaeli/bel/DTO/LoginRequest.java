// Put this in src/main/java/com/kocaeli/bel/DTO/LoginRequest.java
package com.kocaeli.bel.DTO;

import lombok.Getter;



@Getter
public class LoginRequest {
    // Getters and setters
    private String username;
    private String password;

    public LoginRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }
}