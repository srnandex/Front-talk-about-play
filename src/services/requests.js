import axios from 'axios';
import { getToken } from './handleStorage';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const setToken = () => {
  const token = getToken();
  api.defaults.headers.common = {'Authorization': `Bearer ${token}`};
};

export const requestLogin = async (rota, body) => {
  const { data } = await api.post(rota, body);
  return data;
};

export const requestRegister = async (rota, body) => {
  const { data } = await api.post(rota, body);
  return data;
};

export const requestData = async (rota) => {
  const token = getToken();
  const headers = {'Authorization': `Bearer ${token}`}
  const { data } = await api.get(rota, { headers });
  return data;
};

export const requestUser = async (rota, body) => {
  const { data } = await api.get(rota, body);
  return data;
};

// export const requestUpdate = async (rota, id, body) => {
//   const url = `${rota}/${id}`;
//   const { data } = await api.patch(url, body);
//   return data;
// };

export default api;
