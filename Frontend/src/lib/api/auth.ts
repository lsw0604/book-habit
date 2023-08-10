import { axios, noInterceptorAxios } from './';

export const signUpAPI = async (body: SignUpRequestType) => {
  const { data } = await noInterceptorAxios.post<SignUpResponseType>(
    '/api/auth/register',
    body
  );
  return data;
};

export const loginAPI = async (body: LoginRequestType) => {
  const { data } = await noInterceptorAxios.post<LoginResponseType>(
    '/api/auth/login',
    body
  );
  return data;
};

export const accessAPI = async () => {
  const { data } = await axios.get<AccessResponseType>('/api/auth/access');
  return data;
};

export const refreshAPI = async () => {
  const { data } = await axios.get<RefreshResponseType>('/api/auth/refresh');
  return data;
};

export const logoutAPI = async () => {
  const { data } = await noInterceptorAxios.get<LogoutResponseType>(
    '/api/auth/logout'
  );
  return data;
};

export const meAPI = async () => {
  const { data } = await axios.get('/api/auth/me');
  return data;
};

export const kakaoSignupAPI = async (body: KakaoSignUpRequestType) => {
  const { data } = await noInterceptorAxios.post<KakaoSignUpResponseType>(
    '/api/auth/kakao/register',
    body
  );
  return data;
};

export const kakaoAPI = async () =>
  await axios.get('/api/auth/kakao', {
    headers: {
      'Access-Allow-Control-Origin': '*',
      'Access-Allow-Control-Credential': 'include',
    },
  });

export const kakaoCallbackAPI = async (code: string) => {
  const { data } = await noInterceptorAxios.get(
    `/api/auth/kakao/callback?code=${code}`
  );
  return data;
};
