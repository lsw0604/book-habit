import { isAxiosError } from 'axios';
import { axios, accessAxios, refreshAxios } from './';

export const signUpAPI = async (body: SignUpRequestType) => {
  const { data } = await axios.post<SignUpResponseType>(
    '/api/auth/register',
    body,
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
  return data;
};

export const loginAPI = async (body: LoginRequestType) => {
  const { data } = await axios.post<LoginResponseType>(
    '/api/auth/login',
    body,
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
  return data;
};

export const accessAPI = async () => {
  const { data } = await accessAxios.get<AccessResponseType>('', {
    headers: { 'Content-Type': 'application/json' },
  });
  return data;
};

export const refreshAPI = async () => {
  const { data } = await refreshAxios.get<RefreshResponseType>('', {
    headers: { 'Content-Type': 'application/json' },
  });
  return data;
};

export const logoutAPI = async () => {
  const { data } = await axios.get<LogoutResponseType>('/api/auth/logout', {
    headers: { 'Content-Type': 'application/json' },
  });
  return data;
};
