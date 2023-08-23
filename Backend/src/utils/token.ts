import { sign } from 'jsonwebtoken';

interface IProps {
  id?: number;
  email?: string;
  name?: string | null;
  kakao_access?: string;
  kakao_refresh?: string;
}

export default function tokenGenerator({ id, email, name, kakao_access, kakao_refresh }: IProps): {
  access_jwt: string;
  refresh_jwt: string;
} {
  if (kakao_access || kakao_refresh) {
    const access_jwt = sign({ id, email, name, kakao_access }, process.env.ACCESS_TOKEN as string, {
      expiresIn: '1h',
    });
    const refresh_jwt = sign(
      { id, email, name, kakao_refresh },
      process.env.REFRESH_TOKEN as string,
      { expiresIn: '24h' }
    );

    return {
      access_jwt,
      refresh_jwt,
    };
  }

  const access_jwt = sign({ id, email, name }, process.env.ACCESS_TOKEN as string, {
    expiresIn: '1h',
  });
  const refresh_jwt = sign({ id }, process.env.REFRESH_TOKEN as string, { expiresIn: '24h' });

  return {
    access_jwt,
    refresh_jwt,
  };
}
