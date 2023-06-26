import jwt, { JwtPayload } from 'jsonwebtoken';

type TokenGeneratorType = {
  id?: number;
  gender: 'male' | 'female';
  email: string;
  birthday: Date;
  name: string;
};

export default function tokenGenerator({
  id,
  gender,
  email,
  birthday,
  name,
}: TokenGeneratorType): {
  access_jwt: string;
  refresh_jwt: string;
} {
  const access_jwt = jwt.sign(
    { id, gender: gender, email, birthday, name },
    process.env.ACCESS as string,
    { expiresIn: '1h' }
  );
  const refresh_jwt = jwt.sign(
    {
      id,
    },
    process.env.REFRESH as string,
    { expiresIn: '1d' }
  );

  return {
    access_jwt,
    refresh_jwt,
  };
}
