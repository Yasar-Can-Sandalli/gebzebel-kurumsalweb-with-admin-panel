// apiService.ts
import axios from "axios";

export const apiClient = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
});

let requestInterceptorId: number | null = null;
let responseInterceptorId: number | null = null;

/**
 * getToken: auth store’dan token okuyan fonksiyon
 */
export const setupApiInterceptors = (getToken: () => string | null) => {
    // Öncekini kaldır
    if (requestInterceptorId !== null) {
        apiClient.interceptors.request.eject(requestInterceptorId);
    }
    if (responseInterceptorId !== null) {
        apiClient.interceptors.response.eject(responseInterceptorId);
    }

    requestInterceptorId = apiClient.interceptors.request.use(
        (config) => {
            const token = getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            // DEBUG: header gerçekten takıldı mı?
            console.log(
                "[apiService] ->",
                (config.method || "get").toUpperCase(),
                config.baseURL + (config.url || ""),
                "Auth:",
                config.headers.Authorization
            );

            return config;
        },
        (error) => Promise.reject(error)
    );

    // Yeni response interceptor
    responseInterceptorId = apiClient.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                console.log("Unauthorized - redirecting to login");
                window.location.href = "/login";
            }
            return Promise.reject(error);
        }
    );
};

export const apiGet    = async <T,>(url: string)           => (await apiClient.get<T>(url)).data;
export const apiPost   = async <T,>(url: string, body: any)=> (await apiClient.post<T>(url, body)).data;
export const apiPut    = async <T,>(url: string, body: any)=> (await apiClient.put<T>(url, body)).data;
export const apiDelete = async <T = void>(url: string)     => (await apiClient.delete<T>(url)).data;
