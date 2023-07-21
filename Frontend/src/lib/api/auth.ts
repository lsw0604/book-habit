import { axios } from '.';

type SignUpAPIType = {
  email: string;
  password: string;
  name: string;
};

export const signUpAPI = async (body: SignUpAPIType) => {
  const { data } = await axios.post('/api/auth/register', body);
  return data;
};

export const fetchSignUpAPI = async (body: SignUpAPIType) => {
  const { body: response } = await fetch(
    'http://localhost:3001/api/auth/register',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  );
  return response;
};
