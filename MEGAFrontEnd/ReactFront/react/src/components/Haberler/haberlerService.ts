import axios from 'axios';

const API_URL = 'http://localhost:8080/api/haberler';

export const getAllHaberler = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
export const getAllHaberlerTariheGore = async () => {
  const response = await axios.get(`${API_URL}/tarihe-gore`);
  return response.data;
};

export const getHaberlerById = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createHaberler = async (haberler: any) => {
  const response = await axios.post(API_URL, haberler);
  return response.data;
};

export const updateHaberler = async (id: number, haberler: any) => {
  const response = await axios.put(`${API_URL}/${id}`, haberler);
  return response.data;
};

export const deleteHaberler = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.status === 204;
};
