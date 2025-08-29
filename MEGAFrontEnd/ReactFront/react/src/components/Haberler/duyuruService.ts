import axios from 'axios';

const API_URL = 'http://localhost:8080/api/duyurular';

export const getAllDuyurular = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getDuyuruById = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createDuyuru = async (duyuru: any) => {
  const response = await axios.post(API_URL, duyuru);
  return response.data;
};

export const deleteDuyuru = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.status === 200 || response.status === 204;
};
