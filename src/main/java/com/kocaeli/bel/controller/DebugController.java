package com.kocaeli.bel.controller;

import com.kocaeli.bel.model.User;
import com.kocaeli.bel.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/debug")
public class DebugController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/user/{tcno}")
    public ResponseEntity<?> getUserInfo(@PathVariable String tcno) {
        Optional<User> userOptional = userRepository.findByTCNo(tcno);

        if (userOptional.isEmpty()) {
            return ResponseEntity.ok(Map.of("found", false, "message", "User not found"));
        }

        User user = userOptional.get();
        Map<String, Object> info = new HashMap<>();
        info.put("found", true);
        info.put("id", user.getId());
        info.put("tcno", user.getTCNo());
        info.put("isim", user.getIsim());
        info.put("status", user.getStatus());
        info.put("passwordExists", user.getPassword() != null);
        info.put("passwordLength", user.getPassword() != null ? user.getPassword().length() : 0);
        info.put("passwordHash", user.getPassword() != null ? user.getPassword() : "NULL");
        info.put("isBcryptHash", user.getPassword() != null &&
                (user.getPassword().startsWith("$2a$") || user.getPassword().startsWith("$2b$")));

        return ResponseEntity.ok(info);
    }

    @PostMapping("/test-password")
    public ResponseEntity<?> testPassword(@RequestBody Map<String, String> request) {
        String tcno = request.get("tcno");
        String password = request.get("password");

        Optional<User> userOptional = userRepository.findByTCNo(tcno);
        if (userOptional.isEmpty()) {
            return ResponseEntity.ok(Map.of("found", false));
        }

        User user = userOptional.get();

        // Test multiple variations
        Map<String, Object> result = new HashMap<>();
        result.put("found", true);
        result.put("providedPassword", password);
        result.put("storedHash", user.getPassword());
        result.put("hashLength", user.getPassword().length());

        // Test exact match
        boolean matches = passwordEncoder.matches(password, user.getPassword());
        result.put("exactMatch", matches);

        // Test common variations
        Map<String, Boolean> variations = new HashMap<>();

        // Test with different common passwords
        String[] testPasswords = {
                password,
                password.trim(),
                " " + password,
                password + " ",
                password.toLowerCase(),
                password.toUpperCase(),
                "123456",
                "password",
                "admin",
                tcno, // Same as username
                "12345",
                "555555"
        };

        for (String testPwd : testPasswords) {
            variations.put("'" + testPwd + "'", passwordEncoder.matches(testPwd, user.getPassword()));
        }

        result.put("passwordTests", variations);

        // Create a fresh hash of the provided password for comparison
        String freshHash = passwordEncoder.encode(password);
        result.put("freshHashOfProvidedPassword", freshHash);
        result.put("freshHashMatches", passwordEncoder.matches(password, freshHash));

        return ResponseEntity.ok(result);
    }

    @GetMapping("/compare-users")
    public ResponseEntity<?> compareUsers(@RequestParam String tcno1, @RequestParam String tcno2) {
        Optional<User> user1 = userRepository.findByTCNo(tcno1);
        Optional<User> user2 = userRepository.findByTCNo(tcno2);

        Map<String, Object> comparison = new HashMap<>();

        if (user1.isPresent()) {
            User u1 = user1.get();
            Map<String, Object> u1Info = new HashMap<>();
            u1Info.put("id", u1.getId());
            u1Info.put("tcno", u1.getTCNo());
            u1Info.put("isim", u1.getIsim());
            u1Info.put("status", u1.getStatus());
            u1Info.put("passwordHash", u1.getPassword());
            u1Info.put("passwordLength", u1.getPassword() != null ? u1.getPassword().length() : 0);
            comparison.put("user1", u1Info);
        } else {
            comparison.put("user1", Map.of("found", false));
        }

        if (user2.isPresent()) {
            User u2 = user2.get();
            Map<String, Object> u2Info = new HashMap<>();
            u2Info.put("id", u2.getId());
            u2Info.put("tcno", u2.getTCNo());
            u2Info.put("isim", u2.getIsim());
            u2Info.put("status", u2.getStatus());
            u2Info.put("passwordHash", u2.getPassword());
            u2Info.put("passwordLength", u2.getPassword() != null ? u2.getPassword().length() : 0);
            comparison.put("user2", u2Info);
        } else {
            comparison.put("user2", Map.of("found", false));
        }

        return ResponseEntity.ok(comparison);
    }

    @PostMapping("/fix-password")
    public ResponseEntity<?> fixPassword(@RequestBody Map<String, String> request) {
        String tcno = request.get("tcno");
        String newPassword = request.get("password");

        Optional<User> userOptional = userRepository.findByTCNo(tcno);
        if (userOptional.isEmpty()) {
            return ResponseEntity.ok(Map.of("success", false, "message", "User not found"));
        }

        User user = userOptional.get();
        String oldHash = user.getPassword();
        String newHash = passwordEncoder.encode(newPassword);

        user.setPassword(newHash);
        userRepository.save(user);

        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Password updated",
                "oldHash", oldHash,
                "newHash", newHash
        ));
    }
}