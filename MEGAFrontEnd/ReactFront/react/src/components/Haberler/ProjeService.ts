import axios from 'axios';

const API_URL = 'http://localhost:8080/api/projeler';

export interface Proje {
    id?: number;
    baslik: string;
    resimUrl: string;
    durumu: string;
}

export const ProjeService = {
    getAllProjeler: async (): Promise<Proje[]> => {
        const response = await axios.get(API_URL);
        return response.data;
    },

    getProjeById: async (id: number): Promise<Proje> => {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    },

    createProje: async (proje: Proje): Promise<Proje> => {
        const response = await axios.post(API_URL, proje);
        return response.data;
    },

    updateProje: async (id: number, proje: Proje): Promise<Proje> => {
        const response = await axios.put(`${API_URL}/${id}`, proje);
        return response.data;
    },

    deleteProje: async (id: number): Promise<void> => {
        await axios.delete(`${API_URL}/${id}`);
    }
};
