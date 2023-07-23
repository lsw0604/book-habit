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
  const access_jwt = jwt.sign({ id, email, name }, process.env.ACCESS_TOKEN as string, {
    expiresIn: '15s',
  });
  const refresh_jwt = jwt.sign({ id }, process.env.REFRESH_TOKEN as string, { expiresIn: '1h' });

  return {
    access_jwt,
    refresh_jwt,
  };
}
