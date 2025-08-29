import axios from "axios";

const http = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "",
    withCredentials: true,
});

export const apiGet    = async <T,>(url:string)=> (await http.get<T>(url)).data;
export const apiPost   = async <T,>(url:string, body:any)=> (await http.post<T>(url, body)).data;
export const apiPut    = async <T,>(url:string, body:any)=> (await http.put<T>(url, body)).data;
export const apiDelete = async <T=void>(url:string)=> (await http.delete<T>(url)).data;
export default http;
