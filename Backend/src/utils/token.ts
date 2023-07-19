import jwt from 'jsonwebtoken';

interface IProps {
  id?: number;
  email: string;
  name: string;
}

export default function tokenGenerator({ id, email, name }: IProps): {
  access_jwt: string;
  refresh_jwt: string;
} {
  const access_jwt = jwt.sign({ id, email, name }, process.env.ACCESS as string, {
    expiresIn: '1h',
  });
  const refresh_jwt = jwt.sign({ id }, process.env.REFRESH as string, { expiresIn: '1d' });

  return {
    access_jwt,
    refresh_jwt,
  };
}
