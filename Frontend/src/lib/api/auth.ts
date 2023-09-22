import { axios } from './';
import Axios from 'axios';

export const signUpAPI = async (body: SignUpRequestType) => {
  const { data } = await axios.post<SignUpResponseType>(
    '/api/auth/register',
    JSON.stringify(body)
  );
  return data;
};

export const loginAPI = async (body: LocalLoginMutationRequestType) => {
  const { data } = await axios.post<LocalLoginMutationResponseType>(
    '/api/auth/login',
    JSON.stringify(body)
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
  const { data } = await axios.get<LogoutResponseType>('/api/auth/logout');
  return data;
};

export const meAPI = async () => {
  const { data } = await axios.get('/api/auth/me');
  return data;
};

export const kakaoSignupAPI = async (body: KakaoSignUpMutationRequestType) => {
  const { data } = await axios.post<KakaoSignUpMutationResponseType>(
    '/api/auth/kakao/register',
    JSON.stringify(body)
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
  const { data } = await axios.get(`/api/auth/kakao/callback?code=${code}`);
  return data;
};

export const kakaoLogoutUserAPI = async () => {
  try {
    const { data } = await Axios.get(
      `https://kauth.kakao.com/oauth/logout?client_id=${
        import.meta.env.VITE_KAKAO_REST_API
      }&logout_redirect_uri=http://localhost:5173`
    );
    return data;
  } catch (err) {
    console.log('[KAKAO][LOGOUT]', err);
  }
};
