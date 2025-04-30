export type ResponseTokens = ReturnAccessToken & ReturnRefreshToken;

export type ReturnAccessToken = {
  accessToken: string;
};

export type ReturnRefreshToken = {
  refreshToken: string;
};
