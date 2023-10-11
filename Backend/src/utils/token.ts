import { sign } from 'jsonwebtoken';

interface IProps {
  id?: number;
  email?: string;
  name?: string | null;
  kakao_access?: string;
  kakao_refresh?: string;
}

export default function tokenGenerator({ id, email, name }: IProps): {
  access_jwt: string;
  refresh_jwt: string;
} {
  const access_jwt = sign({ id, email, name }, process.env.ACCESS_TOKEN as string, {
    expiresIn: '1h',
  });
  const refresh_jwt = sign({ id }, process.env.REFRESH_TOKEN as string, { expiresIn: '24h' });

  return {
    access_jwt,
    refresh_jwt,
  };
}
