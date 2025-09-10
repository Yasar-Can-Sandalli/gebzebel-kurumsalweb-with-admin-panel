// src/axiosConfig.ts
import axios, { AxiosHeaders } from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true, // cookie kullanmıyorsan false yapabilirsin
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (!token) return config;

    // headers'ı normalize et
    const headers =
        config.headers instanceof AxiosHeaders
            ? config.headers
            : new AxiosHeaders(config.headers);

    headers.set("Authorization", `Bearer ${token}`);
    config.headers = headers;

    return config;
});

api.interceptors.response.use(
    (res) => res,
    (err) => {
        console.log(
            "API error:",
            err?.response?.status,
            err?.config?.method?.toUpperCase(),
            err?.config?.url,
            err?.response?.data
        );
        return Promise.reject(err);
    }
);

export default api;
