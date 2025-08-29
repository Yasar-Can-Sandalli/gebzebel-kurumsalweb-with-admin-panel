import axios from 'axios';

// Updated TarihiYerler interface with all required properties
export interface TarihiYerler {
    id: number;
    resimUrl: string;
    yerIsmi: string;
    genelBilgi: string;
    konum: string;
    konumEtiketi?: string;
    nasilGidilir: string;
    galeri: GaleriResmi[]; // Changed from GaleriResmi to GaleriResmi[]
    aktiviteler: Aktivite[]; // Added this missing property
}

export interface Aktivite {
    emoji: string;
    baslik: string;
    aciklama: string;
}

// Gallery image interface
export interface GaleriResmi {
    id: number;
    path: string;
    alt: string;
}

// Spring Boot backend için temel API URL'i
const API_BASE_URL = 'http://localhost:8080/api';

export const _TarihiYerlerService = {

    /**
     * Tüm tarihi yerleri getirir
     * @returns TarihiYerler dizisi
     */
    getAllTarihiYerler: async (): Promise<TarihiYerler[]> => {
        try {
            const response = await axios.get<TarihiYerler[]>(`${API_BASE_URL}/tarihi-yerler`);
            return response.data;
        } catch (error) {
            console.error('Error fetching tarihi yerler:', error);
            throw error;
        }
    },

    /**
     * Belirli bir ID'ye sahip tarihi yeri getirir
     * @param id - Tarihi yerin kimliği
     * @returns Tek bir TarihiYerler nesnesi
     */
    getTarihiYerById: async (id: number): Promise<TarihiYerler> => {
        try {
            const response = await axios.get<TarihiYerler>(`${API_BASE_URL}/tarihi-yerler/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching tarihi yer with id ${id}:`, error);
            throw error;
        }
    },

    getAktivitelerByYerId: async(id: number): Promise<Aktivite[]> => {
        try {
            const response = await axios.get<Aktivite[]>(`${API_BASE_URL}/aktiviteler/${id}`);
            return response.data;
        } catch(error) {
            console.error(`Error fetching Aktiviteler with id ${id}:`, error);
            throw error;
        }
    },

    getGaleriByYerId: async (id: number): Promise<GaleriResmi[]> => {
        try {
            const response = await axios.get<GaleriResmi[]>(`${API_BASE_URL}/galeri/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching Galeri with id ${id}:`, error);
            throw error;
        }
    },

    /**
     * Yeni bir tarihi yer oluşturur
     * @param tarihiYer - ID harici tarihi yer bilgileri
     * @returns Oluşturulan TarihiYerler nesnesi
     */
    createTarihiYer: async (tarihiYer: Omit<TarihiYerler, 'id'>): Promise<TarihiYerler> => {
        try {
            const response = await axios.post<TarihiYerler>(`${API_BASE_URL}/tarihi-yerler`, tarihiYer);
            return response.data;
        } catch (error) {
            console.error('Error creating tarihi yer:', error);
            throw error;
        }
    },

    /**
     * Mevcut bir tarihi yeri günceller
     * @param id - Güncellenecek yerin kimliği
     * @param tarihiYer - Güncellenmiş veriler
     * @returns Güncellenmiş TarihiYerler nesnesi
     */
    updateTarihiYer: async (id: number, tarihiYer: TarihiYerler): Promise<TarihiYerler> => {
        try {
            const response = await axios.put<TarihiYerler>(`${API_BASE_URL}/tarihi-yerler/${id}`, tarihiYer);
            return response.data;
        } catch (error) {
            console.error(`Error updating tarihi yer with id ${id}:`, error);
            throw error;
        }
    },

    /**
     * Belirli bir ID'ye sahip tarihi yeri siler
     * @param id - Silinecek yerin kimliği
     */
    deleteTarihiYer: async (id: number): Promise<void> => {
        try {
            await axios.delete(`${API_BASE_URL}/tarihi-yerler/${id}`);
        } catch (error) {
            console.error(`Error deleting tarihi yer with id ${id}:`, error);
            throw error;
        }
    }
};

export default _TarihiYerlerService;