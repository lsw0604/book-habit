export interface TokenInterface {
  id: number;
  iat: number;
  exp: number;
}

export interface IAccessToken {
  accessToken: string;
}

export interface IRefreshToken {
  refreshToken: string;
}
