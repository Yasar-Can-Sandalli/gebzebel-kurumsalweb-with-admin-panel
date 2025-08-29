import axios from 'axios';

const API_URL = 'http://localhost:8080/api/kategoriler';

export const getAllKategoriler = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getKategoriById = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createKategori = async (kategori: any) => {
  const response = await axios.post(API_URL, kategori);
  return response.data;
};

export const updateKategori = async (id: number, kategori: any) => {
  const response = await axios.put(`${API_URL}/${id}`, kategori);
  return response.data;
};

export const deleteKategori = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.status === 204;
};

