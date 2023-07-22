import Axios from 'axios';

export const axios = Axios.create({
  baseURL: import.meta.env.VITE_SERVER,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
