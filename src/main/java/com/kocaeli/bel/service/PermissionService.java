package com.kocaeli.bel.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class PermissionService {

    private static final Map<String, Map<String, Boolean>> DEFAULT_PERMISSIONS = Map.of(
            "kurumsal", Map.of("goruntuleme", true, "duzenleme", false, "ekleme", false),
            "gebze", Map.of("goruntuleme", true, "duzenleme", false),
            "hizmetler", Map.of("goruntuleme", true, "duzenleme", false, "silme", false),
            "yayinlar", Map.of("goruntuleme", true, "duzenleme", false, "silme", false),
            "etkinlikler", Map.of("goruntuleme", true, "duzenleme", false, "silme", false),
            "haberler", Map.of("goruntuleme", true, "duzenleme", false, "silme", false),
            "duyurular", Map.of("goruntuleme", true, "duzenleme", false, "silme", false),
            "projeler", Map.of("goruntuleme", true, "duzenleme", false, "silme", false)
    );

    public Map<String, Map<String, Boolean>> getDefaultPermissions() {
        Map<String, Map<String, Boolean>> copy = new HashMap<>();
        DEFAULT_PERMISSIONS.forEach((key, value) ->
                copy.put(key, new HashMap<>(value))
        );
        return copy;
    }

    public Map<String, Map<String, Boolean>> mergeWithDefaults(String userPermissionsJson) {
        Map<String, Map<String, Boolean>> userPermissions = new HashMap<>();

        if (userPermissionsJson != null && !userPermissionsJson.isEmpty()) {
            userPermissions = parseJsonPermissions(userPermissionsJson);
        }

        return mergeWithDefaults(userPermissions);
    }

    public Map<String, Map<String, Boolean>> mergeWithDefaults(Map<String, Map<String, Boolean>> userPermissions) {
        Map<String, Map<String, Boolean>> merged = getDefaultPermissions();

        if (userPermissions != null) {
            userPermissions.forEach((area, permissions) -> {
                if (merged.containsKey(area)) {
                    Map<String, Boolean> mergedPermissions = new HashMap<>(merged.get(area));
                    mergedPermissions.putAll(permissions);
                    merged.put(area, mergedPermissions);
                } else {
                    merged.put(area, new HashMap<>(permissions));
                }
            });
        }

        return merged;
    }

    private Map<String, Map<String, Boolean>> parseJsonPermissions(String json) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.readValue(json, new TypeReference<Map<String, Map<String, Boolean>>>() {});
        } catch (Exception e) {
            e.printStackTrace();
            return new HashMap<>();
        }
    }
}