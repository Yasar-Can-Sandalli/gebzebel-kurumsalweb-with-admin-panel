// src/services/apiService.ts
import axios, { AxiosRequestConfig } from "axios";

export const apiClient = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
    // ÖNEMLİ: Burada global "Content-Type" ayarlamıyoruz.
});

let requestInterceptorId: number | null = null;
let responseInterceptorId: number | null = null;

const isFormData = (d: any) =>
    typeof FormData !== "undefined" && d instanceof FormData;

const isUrlEncoded = (d: any) =>
    typeof URLSearchParams !== "undefined" && d instanceof URLSearchParams;

/** Uygulama açılışında çağırın */
export const setupApiInterceptors = (getToken: () => string | null) => {
    if (requestInterceptorId !== null)
        apiClient.interceptors.request.eject(requestInterceptorId);
    if (responseInterceptorId !== null)
        apiClient.interceptors.response.eject(responseInterceptorId);

    requestInterceptorId = apiClient.interceptors.request.use(
        (config) => {
            const token = getToken();
            if (token) (config.headers ||= {}).Authorization = `Bearer ${token}`;

            // FormData veya URLSearchParams ise Content-Type'ı tarayıcı/axios ayarlasın
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
        (res) => res,
        (err) => Promise.reject(err)
    );
};

export const apiGet      = async <T,>(url: string)                 => (await apiClient.get<T>(url)).data;
export const apiPost     = async <T,>(url: string, body: any)      => (await apiClient.post<T>(url, body)).data;
export const apiPut      = async <T,>(url: string, body: any)      => (await apiClient.put<T>(url, body)).data;
export const apiDelete   = async <T = void>(url: string)           => (await apiClient.delete<T>(url)).data;

// Yardımcılar
export const apiPostForm = async <T,>(url: string, form: FormData) => (await apiClient.post<T>(url, form)).data;
export const apiPostUrlEncoded = async <T,>(url: string, params: URLSearchParams) =>
    (await apiClient.post<T>(url, params)).data; // axios kendisi CT: application/x-www-form-urlencoded ekler
