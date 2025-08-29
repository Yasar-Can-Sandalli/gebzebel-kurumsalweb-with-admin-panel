package com.kocaeli.bel.controller;

import com.kocaeli.bel.service.PermissionService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

// PermissionController.java
@RestController
@RequestMapping("/api/permissions")
public class PermissionController {

    private final PermissionService permissionService;

    public PermissionController(PermissionService permissionService) {
        this.permissionService = permissionService;
    }

    @GetMapping("/default")
    public Map<String, Map<String, Boolean>> getDefaultPermissions() {
        return permissionService.getDefaultPermissions();
    }
}