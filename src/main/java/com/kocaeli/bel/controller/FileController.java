package com.kocaeli.bel.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/files")
@CrossOrigin(origins = "*")
public class FileController {

    private static final String UPLOAD_DIR = "MEGAFrontEnd/ReactFront/react/src/assets/user_images/";

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            // Dosya kontrolü
            if (file.isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "message", "Dosya boş olamaz"));
            }

            // Dosya tipi kontrolü
            if (!file.getContentType().startsWith("image/")) {
                return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "message", "Sadece resim dosyaları kabul edilir"));
            }

            // Dosya boyutu kontrolü (1MB)
            if (file.getSize() > 1024 * 1024) {
                return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "message", "Dosya boyutu 1MB'dan küçük olmalıdır"));
            }

            // Upload dizinini oluştur
            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            // Benzersiz dosya adı oluştur
            String originalFilename = file.getOriginalFilename();
            String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String fileName = "user_" + UUID.randomUUID().toString() + extension;

            // Dosyayı kaydet
            Path filePath = Paths.get(UPLOAD_DIR + fileName);
            Files.copy(file.getInputStream(), filePath);

            return ResponseEntity.ok()
                .body(Map.of(
                    "success", true,
                    "fileName", fileName,
                    "message", "Dosya başarıyla yüklendi"
                ));

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("success", false, "message", "Dosya yüklenirken hata oluştu: " + e.getMessage()));
        }
    }

    @GetMapping("/image/{fileName}")
    public ResponseEntity<?> getImage(@PathVariable String fileName) {
        try {
            Path filePath = Paths.get(UPLOAD_DIR + fileName);
            if (!Files.exists(filePath)) {
                return ResponseEntity.notFound().build();
            }

            byte[] imageBytes = Files.readAllBytes(filePath);
            String contentType = Files.probeContentType(filePath);
            
            return ResponseEntity.ok()
                .header("Content-Type", contentType)
                .body(imageBytes);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Resim okunamadı"));
        }
    }
}
