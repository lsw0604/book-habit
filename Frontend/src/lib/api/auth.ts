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

export const kakaoSignupAPI = async (body: KakaoSignUpMutationRequestType) => {
  const { data } = await axios.put<KakaoSignUpMutationResponseType>(
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

export const profileUpdateAPI = async (
  body: ProfileEditMutationRequestType
) => {
  const { data } = await axios.put<ProfileEditMutationResponseType>(
    '/api/auth/profile',
    body,
    {
      headers: {
        'Content-Type': 'Multipart/form-data',
      },
    }
  );
  return data;
};

export const profileInfoAPI = async () => {
  const { data } = await axios.get<ProfileInfoQueryResponseType>(
    `/api/auth/info`
  );
  return data;
};

export const profileLikeListAPI = async (page: number) => {
  const { data } = await axios.get<ProfileLikeInfinityQueryResponseType>(
    `/api/auth/like?page=${page}`
  );
  return data;
};
