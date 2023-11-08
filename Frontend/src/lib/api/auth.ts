import { axios } from './';
import Axios from 'axios';

// READ

/**
 * * access_token을 verify하는 API
 */
export const accessAPI = async () => {
  const { data } = await axios.get<AccessResponseType>('/api/auth/access');
  return data;
};

/**
 * * refresh_token을 verify하는 API
 */
export const refreshAPI = async () => {
  const { data } = await axios.get<RefreshResponseType>('/api/auth/refresh');
  return data;
};

/**
 * * logout하는 API
 */
export const logoutAPI = async () => {
  const { data } = await axios.get<LogoutResponseType>('/api/auth/logout');
  return data;
};

/**
 * * user의 좋아요 리스트를 불러오는 API
 */
export const profileLikeListAPI = async (page: ProfileLikeQueryRequestType) => {
  const { data } = await axios.get<ProfileLikeQueryResponseType>(
    `/api/auth/like?page=${page}`
  );
  return data;
};

/**
 * * user의 댓글 리스트를 불러오는 API
 */
export const profileReplyListAPI = async (
  page: ProfileReplyQueryRequestType
) => {
  const { data } = await axios.get<ProfileReplyQueryResponseType>(
    `/api/auth/reply?page=${page}`
  );
  return data;
};

/**
 * * kakao redirect URL을 요청하는 API
 */
export const kakaoAPI = async () =>
  await axios.get('/api/auth/kakao', {
    headers: {
      'Access-Allow-Control-Origin': '*',
      'Access-Allow-Control-Credential': 'include',
    },
  });

/**
 * * kakao OAuth 로직을 수행하는 API
 */
export const kakaoCallbackAPI = async (code: string) => {
  const { data } = await axios.get(`/api/auth/kakao/callback?code=${code}`);
  return data;
};

/**
 * * kakao logout을 요청하는 API
 */
export const kakaoLogoutUserAPI = async () => {
  try {
    const { data } = await Axios.get(
      `https://kauth.kakao.com/oauth/logout?client_id=${
        import.meta.env.VITE_KAKAO_REST_API
      }&logout_redirect_uri=${import.meta.env.VITE_KAKAO_LOGOUT_URI}`
    );
    return data;
  } catch (err) {
    console.log('[KAKAO][LOGOUT]', err);
  }
};

// CREATE

/**
 * * local 회원가입하는 API
 */
export const signUpAPI = async (body: SignUpRequestType) => {
  const { data } = await axios.post<SignUpResponseType>(
    '/api/auth/register',
    JSON.stringify(body)
  );
  return data;
};

/**
 * * local Login API
 */
export const loginAPI = async (body: LocalLoginMutationRequestType) => {
  const { data } = await axios.post<LocalLoginMutationResponseType>(
    '/api/auth/login',
    JSON.stringify(body)
  );
  return data;
};

// UPDATE

/**
 * * kakao 회원정보를 수정하는 API
 */
export const kakaoSignupAPI = async (body: KakaoSignUpMutationRequestType) => {
  const { data } = await axios.put<KakaoSignUpMutationResponseType>(
    '/api/auth/kakao/register',
    JSON.stringify(body)
  );
  return data;
};

/**
 * * user 프로필 사진을 수정하는 API
 */
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
