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
import org.springframework.security.core.context.SecurityContextHolder;
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
            // Debug log
            System.out.println("Register request received: TCNo=" + registerRequest.getTCNo() 
                + ", isim=" + registerRequest.getIsim() 
                + ", password length=" + (registerRequest.getPassword() != null ? registerRequest.getPassword().length() : "null"));
            
            // TC Kimlik No doğrulama (11 haneli olmalı)
            if (registerRequest.getTCNo() == null || !registerRequest.getTCNo().matches("^\\d{11}$")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("status", "error", "message", "TC Kimlik Numarası 11 haneli olmalıdır"));
            }
            
            // İsim doğrulama (sadece harfler ve boşluk içermeli)
            if (registerRequest.getIsim() == null || !registerRequest.getIsim().matches("^[a-zA-ZğüşıöçĞÜŞİÖÇ ]+$")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("status", "error", "message", "İsim sadece harflerden oluşmalıdır"));
            }
            
            // Parola doğrulama (test için basitleştirildi - en az 6 karakter)
            String password = registerRequest.getPassword();
            if (password == null || password.length() < 6) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("status", "error", "message", 
                            "Parola en az 6 karakter uzunluğunda olmalıdır"));
            }
            
            // TC Kimlik No kontrolü
            if (userRepository.findByTCNo(registerRequest.getTCNo()).isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(Map.of("status", "error", "message", "Bu TC No ile kayıtlı kullanıcı zaten var"));
            }
    
            try {
                // Şifreyi hashle
                String hashedPassword = passwordEncoder.encode(registerRequest.getPassword());
                
                // Varsayılan yetkileri oluştur
                String defaultPermissionsJson = getDefaultPermissionsJson();
                
                // Doğrudan JDBC kullanarak SQL sorgusu çalıştır
                String sql = "INSERT INTO KULLANICILAR (TCNO, ISIM, PASSWORD, STATUS, YETKILERJSON, PROFIL_FOTO) VALUES (?, ?, ?, ?, ?, ?)";
                jdbcTemplate.update(sql, 
                    registerRequest.getTCNo(), 
                    registerRequest.getIsim(), 
                    hashedPassword, 
                    "Aktif",
                    defaultPermissionsJson,
                    registerRequest.getProfilFoto() != null ? registerRequest.getProfilFoto() : ""
                );
                
                return ResponseEntity.ok()
                        .body(Map.of(
                            "status", "success", 
                            "message", "Kullanıcı başarıyla kaydedildi",
                            "data", Map.of(
                                "TCNo", registerRequest.getTCNo(),
                                "isim", registerRequest.getIsim()
                            )
                        ));
            } catch (Exception ex) {
                ex.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(Map.of("status", "error", "message", "Veritabanı hatası: " + ex.getMessage()));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("status", "error", "message", "Kayıt işlemi sırasında bir hata oluştu: " + e.getMessage()));
        }
    }
    
    /**
     * Varsayılan yetkileri JSON formatına dönüştürür
     */
    private String getDefaultPermissionsJson() {
        try {
            return objectMapper.writeValueAsString(permissionService.getDefaultPermissions());
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "{}"; // Boş JSON objesi
        }
    }
    
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String tcNo = request.get("tcNo");
        
        if (tcNo == null || tcNo.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("status", "error", "message", "TC Kimlik Numarası gereklidir"));
        }
        
        // TC Kimlik doğrulama
        if (!tcNo.matches("^\\d{11}$")) {
            return ResponseEntity.badRequest()
                    .body(Map.of("status", "error", "message", "Geçerli bir TC Kimlik Numarası giriniz"));
        }
        
        // Kullanıcıyı kontrol et
        Optional<User> userOptional = userRepository.findByTCNo(tcNo);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("status", "error", "message", "Bu TC Kimlik Numarası ile kayıtlı kullanıcı bulunamadı"));
        }
        
        // Gerçek bir uygulamada burada şifre sıfırlama e-postası gönderilir
        // Şimdilik sadece başarılı yanıt döndürelim
        return ResponseEntity.ok()
                .body(Map.of(
                    "status", "success", 
                    "message", "Şifre sıfırlama talimatları gönderildi. Lütfen e-postanızı kontrol edin."
                ));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("status", "error", "message", "Kullanıcı kimlik doğrulaması yapılmamış"));
            }

            String currentTCNo = authentication.getName();
            User currentUser = userService.findByTCNo(currentTCNo);
            
            if (currentUser == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("status", "error", "message", "Kullanıcı bulunamadı"));
            }

            // Parse permissions from JSON string
            Map<String, Map<String, Boolean>> permissions =
                    permissionService.mergeWithDefaults(currentUser.getYetkilerJson());

            // Create response with user data
            Map<String, Object> userData = Map.of(
                    "id", currentUser.getId(),
                    "tcno", currentUser.getTCNo(),
                    "isim", currentUser.getIsim() != null ? currentUser.getIsim() : "",
                    "status", currentUser.getStatus() != null ? currentUser.getStatus() : "",
                    "profilFoto", currentUser.getProfilFoto() != null ? currentUser.getProfilFoto() : "",
                    "permissions", permissions
            );

            return ResponseEntity.ok()
                    .body(Map.of(
                            "status", "success",
                            "data", userData
                    ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("status", "error", "message", "Sunucu hatası: " + e.getMessage()));
        }
    }
}