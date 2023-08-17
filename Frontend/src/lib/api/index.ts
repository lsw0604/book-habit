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

axios.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = `bearer ${window.localStorage.getItem(
      'ACCESS'
    )}`;
    config.headers.Accept = 'application/json';
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const statusCode = error.response.status;
    const { message, strategy } = error.response.data;

    if (statusCode === 403 && message && strategy === 'access') {
      const { access_jwt } = await refreshAPI();

      originalRequest._retry = true;
      window.localStorage.setItem('ACCESS', access_jwt);
      return axios(originalRequest);
    }

    if (statusCode === 403 && message && strategy === 'refresh') {
      await logoutAPI();

      originalRequest._retry = true;
      window.localStorage.removeItem('ACCESS');
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
