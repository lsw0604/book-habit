import { Cookies } from 'react-cookie';

export default function cookie(): {
  setAccessCookie: (jwt: string) => void;
  setRefreshCookie: (jwt: string) => void;
  getAccessCookie: () => string;
  getRefreshCookie: () => string;
} {
  const cookie = new Cookies();

  const setAccessCookie = (jwt: string) => {
    cookie.set('access', jwt, {
      maxAge: 1000 * 60 * 60 * 60,
      httpOnly: true,
      path: '/',
    });
  };

  const setRefreshCookie = (jwt: string) => {
    cookie.set('refresh', jwt, {
      maxAge: 1000 * 60 * 60 * 60,
      httpOnly: true,
      path: '/',
    });
  };

  const getAccessCookie = () => {
    return cookie.get('access') as string;
  };

  const getRefreshCookie = () => {
    return cookie.get('refresh') as string;
  };
  return {
    getAccessCookie,
    getRefreshCookie,
    setAccessCookie,
    setRefreshCookie,
  };
}
