// src/axiosConfig.ts
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080", // Spring Boot kökü
    withCredentials: true,            // session/cookie kullanıyorsan açık kalsın
});

// (Opsiyonel) istek/yanıt interceptor'ları
api.interceptors.response.use(
    (res) => res,
    (err) => {
        // Merkezi hata yakalama
        console.error("API error:", err?.response || err);
        return Promise.reject(err);
    }
);

export default api;
