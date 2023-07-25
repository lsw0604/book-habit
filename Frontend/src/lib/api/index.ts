import Axios from 'axios';
import { logoutAPI, refreshAPI } from './auth';

export const axios = Axios.create({
  baseURL: import.meta.env.VITE_SERVER,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    Accept: 'application/json',
  },
  withCredentials: true,
});

export const accessAxios = Axios.create({
  baseURL: `${import.meta.env.VITE_SERVER}/api/auth/access`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    Accept: 'application/json',
  },
  withCredentials: true,
});

export const refreshAxios = Axios.create({
  baseURL: `${import.meta.env.VITE_SERVER}/api/auth/refresh`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    Accept: 'application/json',
  },
  withCredentials: true,
});

accessAxios.interceptors.request.use(
  (config) => {
    console.log('[REQUEST][ACCESS][CONFIG]', config);
    return config;
  },
  async (error) => {
    console.log('[REQUEST][ACCESS][ERROR]', error);
    return Promise.reject(error);
  }
);

accessAxios.interceptors.response.use(
  (config) => {
    console.log('[RESPONSE][ACCESS][CONFIG', config);
    return config;
  },
  async (error) => {
    console.log('[RESPONSE][ACCESS][ERROR]', error);
    const response = await refreshAPI();

    if (response?.status === 'success') {
      return Promise.reject(response);
    }

    return Promise.reject(error);
  }
);

refreshAxios.interceptors.request.use(
  (config) => {
    console.log('[REQUEST][REFRESH][CONFIG]', config);
    return config;
  },
  async (error) => {
    console.log('[REQUEST][REFRESH][ERROR]', error);
    return Promise.reject(error);
  }
);

refreshAxios.interceptors.response.use(
  (config) => {
    console.log('[RESPONSE][REFRESH][CONFIG]', config);
    return config;
  },
  async (error) => {
    console.log('[RESPONSE][REFRESH][ERROR]', error);
    const response = await logoutAPI();

    if (response?.status === 'success') {
      return Promise.reject(response);
    }

    return Promise.reject(error);
  }
);
