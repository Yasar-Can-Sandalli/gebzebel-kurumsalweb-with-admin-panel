// services/apiService.ts
import axios, { AxiosRequestConfig } from "axios";

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080",
    withCredentials: true,
    // Content-Type burada sabit değil, payload tipine göre dinamik ayarlanacak
});

let requestInterceptorId: number | null = null;
let responseInterceptorId: number | null = null;

const isFormData = (d: any) =>
    typeof FormData !== "undefined" && d instanceof FormData;

const isUrlEncoded = (d: any) =>
    typeof URLSearchParams !== "undefined" && d instanceof URLSearchParams;

/** Uygulama açılışında 1 kez çağırılmalı */
export const setupApiInterceptors = (getToken: () => string | null) => {
    if (requestInterceptorId !== null)
        apiClient.interceptors.request.eject(requestInterceptorId);
    if (responseInterceptorId !== null)
        apiClient.interceptors.response.eject(responseInterceptorId);

    requestInterceptorId = apiClient.interceptors.request.use(
        (config) => {
            const token = getToken();
            if (token) (config.headers ||= {}).Authorization = `Bearer ${token}`;

            // Payload tipine göre Content-Type yönetimi
            const data = (config as AxiosRequestConfig).data;
            if (isFormData(data) || isUrlEncoded(data)) {
                if (config.headers && "Content-Type" in config.headers) {
                    delete (config.headers as any)["Content-Type"];
                }
            } else {
                (config.headers ||= {})["Content-Type"] = "application/json";
            }

            return config;
        },
        (error) => Promise.reject(error)
    );

    responseInterceptorId = apiClient.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                // Örn: store temizleme veya login'e yönlendirme
                window.location.href = "/login";
            }
            return Promise.reject(error);
        }
    );
};

// Yardımcılar
export const apiGet    = async <T,>(url: string)            => (await apiClient.get<T>(url)).data;
export const apiPost   = async <T,>(url: string, body: any) => (await apiClient.post<T>(url, body)).data;
export const apiPut    = async <T,>(url: string, body: any) => (await apiClient.put<T>(url, body)).data;
export const apiDelete = async <T = void>(url: string)      => (await apiClient.delete<T>(url)).data;

// FormData / UrlEncoded
export const apiPostForm = async <T,>(url: string, form: FormData) =>
    (await apiClient.post<T>(url, form)).data;

export const apiPostUrlEncoded = async <T,>(url: string, params: URLSearchParams) =>
    (await apiClient.post<T>(url, params)).data;

// Eski import'ları kırmamak için:
export const http = apiClient;     // bazı dosyalar http ismiyle import edebilir
export default apiClient;          // default import'lar için
