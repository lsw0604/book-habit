import Axios from 'axios';
import { logoutAPI, refreshAPI } from './auth';

export const axios = Axios.create({
  baseURL: import.meta.env.VITE_SERVER,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: 'application/json',
  },
  withCredentials: true,
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const statusCode = error.response.status;
    const { message, strategy } = error.response.data;

    if (statusCode === 403 && message && strategy === 'access') {
      await refreshAPI();
      return axios(originalRequest);
    }

    if (statusCode === 403 && message && strategy === 'refresh') {
      await logoutAPI();
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
