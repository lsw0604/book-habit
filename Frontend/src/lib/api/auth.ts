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
