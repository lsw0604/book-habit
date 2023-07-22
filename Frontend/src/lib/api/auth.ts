import { axios } from './';

type SignUpRequestType = {
  email: string;
  password: string;
  name: string;
};

type SignUpResponseType = {
  message: string;
  status: 'success' | 'failure';
};

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

type LoginRequestType = {
  email: string;
  password: string;
};

type LoginResponseType = {
  id?: number;
  name?: string;
  email?: string;
  message: string;
  status: 'success' | 'failure';
  access: string;
  refresh: string;
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

type AccessResponseType = {
  id?: number;
  name: string;
  email: string;
  message: string;
  status: 'success' | 'failure';
};

export const accessAPI = async () => {
  const { data } = await axios.get<AccessResponseType>('/api/auth/access', {
    headers: { 'Content-Type': 'application/json' },
  });
  return data;
};

type RefreshResponseType = {
  id?: number;
  name: string;
  email: string;
  message: string;
  status: 'success' | 'failure';
  access: string;
};

export const refreshAPI = async () => {
  const { data } = await axios.get<RefreshResponseType>('/api/auth/refresh', {
    headers: { 'Content-Type': 'application/json' },
  });
  return data;
};
