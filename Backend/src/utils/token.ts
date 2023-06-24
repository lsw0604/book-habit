import jwt, { JwtPayload } from 'jsonwebtoken';

const { ACCESS, REFRESH } = process.env;

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
  verifyAccessToken: (access: string) => string | JwtPayload;
  verifyRefreshToken: (refresh: string) => string | JwtPayload;
} {
  const access_jwt = jwt.sign(
    { id, gender: gender, email, birthday, name },
    ACCESS,
    { expiresIn: '1h' }
  );
  const refresh_jwt = jwt.sign(
    {
      id,
    },
    REFRESH,
    { expiresIn: '1d' }
  );

  function verifyAccessToken(accessToken: string) {
    return jwt.verify(accessToken, ACCESS);
  }

  function verifyRefreshToken(refreshToken: string) {
    return jwt.verify(refreshToken, REFRESH);
  }

  return {
    access_jwt,
    refresh_jwt,
    verifyAccessToken,
    verifyRefreshToken,
  };
}
