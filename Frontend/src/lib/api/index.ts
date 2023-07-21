import Axios from 'axios';

console.log(import.meta.env.VITE_SERVER);

export const axios = Axios.create({
  url: 'http://localhost:3001',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
