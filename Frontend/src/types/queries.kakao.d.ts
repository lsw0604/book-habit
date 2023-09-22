// useKakaoCallbackQuery의 타입들

type KakaoCallbackQueryResponseType = {
  id: number;
  name?: string;
  gender?: GenderType;
  age?: number;
  profile: string;
  email: string;
  provider: ProviderType;
  access_jwt: string;
  message: string;
  status: StatusType;
};

// useKakaoSignUpMutation의 타입들

type KakaoSignUpMutationResponseType = {
  id: number;
  email: string;
  name: string;
  gender: GenderType;
  provider: ProviderType;
  age: number;
  message: string;
  status: StatusType;
  profile: string;
};

type KakaoSignUpMutationRequestType = {
  name: string;
  gender: GenderType;
  age: number;
};
