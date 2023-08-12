import Axios, { AxiosError } from 'axios';
import { refreshAPI } from './auth';

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
  async (
    error: AxiosError<{
      message: string;
      status: 'error' | 'success';
      strategy: 'access' | 'refresh';
    }>
  ) => {
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
        const { name, id, email, status, message, age, gender } =
          await refreshAPI();
        return Promise.reject({
          email,
          id,
          name,
          status,
          message,
          age,
          gender,
        });
      }
    }
    return Promise.reject(error);
  }
);
