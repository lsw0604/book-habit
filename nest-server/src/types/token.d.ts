export type TokenType = {
  id: number;
  iat: number;
  exp: number;
};

export type AccessTokenType = {
  accessToken: string;
};

export type RefreshTokenType = {
  refreshToken: string;
};
