package com.kocaeli.bel.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kocaeli.bel.DTO.UserDTO;
import com.kocaeli.bel.model.User;
import com.kocaeli.bel.repository.UserRepository;
import com.kocaeli.bel.exception.UserAlreadyExistsException;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ObjectMapper objectMapper;
    private final PermissionService permissionService;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       ObjectMapper objectMapper,
                       PermissionService permissionService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.objectMapper = objectMapper;
        this.permissionService = permissionService;
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(user -> new UserDTO(
                        user.getId(),
                        user.getTCNo(),
                        user.getIsim(),
                        user.getStatus(),
                        user.getYetkilerJson()))
                .toList();
    }
    public User findByTCNo(String tcno) {
        return userRepository.findByTCNo(tcno)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with TCNo: " + tcno));
    }
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id)
                .map(this::mergeUserPermissionsWithDefaults);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public boolean existsById(Long id) {
        return userRepository.existsById(id);
    }

    public boolean existsByTCNo(String TCNo) {
        return userRepository.existsByTCNo(TCNo);
    }

    public Optional<User> authenticate(String email) {
        return userRepository.findByTCNo(email)
                .map(this::mergeUserPermissionsWithDefaults);
    }

    public User registerUser(User user) {
        if (userRepository.findByTCNo(user.getTCNo()).isPresent()) {
            throw new UserAlreadyExistsException("Bu TC No ile kayıtlı bir kullanıcı zaten var.");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Default yetkileri ata
        if (user.getYetkilerJson() == null || user.getYetkilerJson().isEmpty()) {
            user.setYetkilerJson(getDefaultPermissionsJson());
        }

        return userRepository.save(user);
    }

    public User yetkileriSifirla(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("Kullanıcı bulunamadı"));

        user.setYetkilerJson(getDefaultPermissionsJson());
        return userRepository.save(user);
    }

    public User authenticateUser(String username, String rawPassword) {
        return userRepository.findByTCNo(username)
                .filter(user -> passwordEncoder.matches(rawPassword, user.getPassword()))
                .map(this::mergeUserPermissionsWithDefaults)
                .orElseThrow(() -> new UsernameNotFoundException("Invalid username or password"));
    }

    private User mergeUserPermissionsWithDefaults(User user) {
        try {
            // Kullanıcının yetkilerini default yetkilerle birleştir
            Map<String, Map<String, Boolean>> mergedPermissions =
                    permissionService.mergeWithDefaults(user.getYetkilerJson());

            // Birleştirilmiş yetkileri JSON'a çevir
            String mergedPermissionsJson = objectMapper.writeValueAsString(mergedPermissions);

            // User nesnesini güncelle (orijinal veritabanı kaydını değiştirmeden)
            User updatedUser = new User(user);
            updatedUser.setYetkilerJson(mergedPermissionsJson);

            return updatedUser;
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Yetkiler birleştirilirken hata oluştu", e);
        }
    }

    private String getDefaultPermissionsJson() {
        try {
            return objectMapper.writeValueAsString(permissionService.getDefaultPermissions());
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Default yetkiler JSON'a çevrilemedi", e);
        }
    }
}