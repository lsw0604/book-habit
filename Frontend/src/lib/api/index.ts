import Axios, { AxiosError } from 'axios';
import { logoutAPI, refreshAPI } from './auth';

export const axios = Axios.create({
  baseURL: import.meta.env.VITE_SERVER,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    Accept: 'application/json',
  },
  withCredentials: true,
});

axios.interceptors.request.use(
  (config) => {
    console.log(config);
    return config;
  },
  async (err) => {
    console.log(err);
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },

  async (
    error: AxiosError<{
      message: string;
      status: 'error' | 'success';
      strategy: 'access' | 'refresh';
    }>
  ) => {
    console.log('[4]', error);
    const response = error.response;
    const status = error.response?.status;
    const message = response?.data.message;
    const strategy = response?.data.strategy;

    if (strategy === 'access') {
      if (
        (response && status === 403 && message === 'No auth token') ||
        (response && status === 403 && message === 'jwt malformed') ||
        (response && status === 403 && message === 'jwt expired') ||
        (response && status === 403 && message === 'invalid token')
      ) {
        const { name, id, email, status, message } = await refreshAPI();
        return Promise.reject({ email, id, name, status, message });
      }
    } else if (strategy === 'refresh') {
      if (
        (response && status === 403 && message === 'No auth token') ||
        (response && status === 403 && message === 'jwt malformed') ||
        (response && status === 403 && message === 'jwt expired') ||
        (response && status === 403 && message === 'invalid token')
      ) {
        // delete axios.defaults.headers.common['Authorization'];?
        await logoutAPI();
      }
    }
    return Promise.reject(error);
  }
);

// let isRefreshing = false;
// let requestQueue: (() => void)[] = [];

// axios.interceptors.response.use(
//   (response) => {
//     console.log('[3]', response.data);
//     if (response.data.message === 'ACCESS_TOKEN_VERIFIED') {
//       return response;
//     }

//     if (response.data.message === 'REFRESH_TOKEN_VERIFIED') {
//       axios.defaults.headers.common[
//         'Authorization'
//       ] = `Bearer ${response.data.access}`;
//       requestQueue.forEach((resolve) => resolve());
//       requestQueue = [];
//     }
//     return response;
//   },

//   async (
//     error: AxiosError<{
//       message: string;
//       status: 'error' | 'success';
//       strategy: 'access' | 'refresh';
//     }>
//   ) => {
//     console.log('[4]', error);
//     const response = error.response;
//     const status = error.response?.status;
//     const message = response?.data.message;
//     const strategy = response?.data.strategy;

//     if (strategy === 'access') {
//       if (
//         response &&
//         status === 403 &&
//         message &&
//         [
//           'No auth token',
//           'jwt malformed',
//           'jwt expired',
//           'invalid token',
//         ].includes(message)
//       ) {
//         const retryOriginalRequest = new Promise<void>((resolve) => {
//           requestQueue.push(() => resolve());
//         });

//         if (!isRefreshing) {
//           isRefreshing = true;
//           await refreshAPI();
//           isRefreshing = false;
//         }

//         return retryOriginalRequest;
//       }
//     } else if (strategy === 'refresh') {
//       if (
//         response &&
//         status === 403 &&
//         message &&
//         [
//           'No auth token',
//           'jwt malformed',
//           'jwt expired',
//           'invalid token',
//         ].includes(message)
//       ) {
//         await logoutAPI();
//       }
//     }
//     return Promise.reject(error);
//   }
// );
