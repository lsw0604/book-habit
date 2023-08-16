import axios from 'axios';

interface IProps {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  token_type: string;
}

export const fetchKakaoTokenAPI = async (code: string) => {
  const body = {
    grant_type: 'authorization_code',
    client_id: import.meta.env.VITE_KAKAO_REST_API,
    redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
    code,
  };
  const url = `https://kauth.kakao.com/oauth/token`;
  const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

  try {
    const { data } = await axios.post<IProps>(url, body, { headers });
    window.localStorage.setItem('KAKAO_ACCESS', data.access_token);
    return data;
  } catch (err) {
    console.log('fetchKakaoTokenAPI [ERR]', err);
  }
};

export const fetchKakaoUserAPI = async () => {
  if (window.localStorage.getItem('KAKAO_ACCESS')) {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded;',
      Authorization: `Bearer ${window.localStorage.getItem('KAKAO_ACCESS')}`,
    };
    const url = 'https://kapi.kakao.com/v2/user/me';
    try {
      const { data } = await axios.get(url, { headers });
      return data;
    } catch (err) {
      console.log('fetchKakaoUserAPI [ERR]', err);
    }
  } else {
    return 'WINDOW_LOCAL_STORAGE에 ACCESS_TOKEN이 없습니다.';
  }
};
