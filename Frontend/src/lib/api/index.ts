import axios from 'axios';

export const Client = axios.create({
  url: process.env.BASE_URL,
  withCredentials: true,
});
