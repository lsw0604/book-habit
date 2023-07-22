import { axios } from './';

type SignUpRequestType = {
  email: string;
  password: string;
  name: string;
};

type SignUpResponseType = {
  message: string;
  status: boolean;
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
  message: string;
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
