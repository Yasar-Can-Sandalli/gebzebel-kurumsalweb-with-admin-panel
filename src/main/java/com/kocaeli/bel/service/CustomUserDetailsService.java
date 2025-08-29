package com.kocaeli.bel.service;

import com.kocaeli.bel.model.User;
import com.kocaeli.bel.repository.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("UserDetailsService: Loading user by username: " + username);

        User user = userRepository.findByTCNo(username)
                .orElseThrow(() -> {
                    System.out.println("UserDetailsService: User not found: " + username);
                    return new UsernameNotFoundException("User not found with TCNo: " + username);
                });

        System.out.println("UserDetailsService: User found - TCNo: " + user.getTCNo());
        System.out.println("UserDetailsService: User status: " + user.getStatus());

        // Create Spring Security UserDetails object
        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getTCNo())
                .password(user.getPassword())
                .authorities(Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")))
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .disabled(false)
                .build();
    }
    
}