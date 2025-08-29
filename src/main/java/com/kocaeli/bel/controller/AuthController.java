package com.kocaeli.bel.controller;

import com.kocaeli.bel.DTO.LoginResponse;
import com.kocaeli.bel.repository.UserRepository;
import com.kocaeli.bel.service.UserService;
import com.kocaeli.bel.DTO.LoginRequest;
import com.kocaeli.bel.DTO.RegisterHandler;
import com.kocaeli.bel.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.kocaeli.bel.security.JwtTokenProvider;
import com.kocaeli.bel.service.PermissionService;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PermissionService permissionService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );

            String token = jwtTokenProvider.generateToken(authentication);

            User user = userService.authenticate(loginRequest.getUsername())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            // Parse permissions from JSON string
            Map<String, Map<String, Boolean>> permissions =
                    permissionService.mergeWithDefaults(user.getYetkilerJson());

            // Create response with permissions
            LoginResponse loginResponse = new LoginResponse(
                    token,
                    user.getTCNo(),
                    user.getTCNo(),
                    user.getIsim(),
                    permissions
            );

            return ResponseEntity.ok()
                    .body(Map.of(
                            "status", "success",
                            "data", loginResponse
                    ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("status", "error", "message", "Geçersiz kullanıcı adı veya şifre"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterHandler registerRequest) {
        try {
            if (userRepository.findByTCNo(registerRequest.getTCNo()).isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(Map.of("status", "error", "message", "Bu TC No ile kayıtlı kullanıcı zaten var"));
            }

            User user = new User();
            user.setTCNo(registerRequest.getTCNo());
            user.setPassword(registerRequest.getPassword()); // Do NOT hash here
            user.setStatus("Aktif");

            User newUser = userService.registerUser(user); // Hash in service

            return ResponseEntity.ok()
                    .body(Map.of("status", "success", "data", newUser));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("status", "error", "message", "Kayıt işlemi sırasında bir hata oluştu: " + e.getMessage()));
        }
    }

}