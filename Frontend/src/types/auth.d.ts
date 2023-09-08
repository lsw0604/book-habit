type SignUpRequestType = {
  email: string;
  password: string;
  name: string;
  gender: GenderType;
  age: number;
};

type SignUpResponseType = {
  message: string;
  status: StatusType;
};

type KakaoSignUpRequestType = {
  name: string;
  gender: GenderType;
  age: number | '';
};

type KakaoSignUpResponseType = {
  id: number;
  email: string;
  name: string;
  gender: GenderType;
  provider: ProviderType;
  age: number;
  message: string;
  status: StatusType;
};

type LoginRequestType = {
  email: string;
  password: string;
};

type LoginResponseType = {
  id: number;
  name: string;
  email: string;
  gender: GenderType;
  age: number;
  provider: ProviderType;
  access_jwt: string;
  message: string;
  status: StatusType;
};

type AccessResponseType = {
  id: number;
  name: string;
  email: string;
  gender: GenderType;
  age: number;
  provider: ProviderType;
  message: string;
  status: StatusType;
};

type RefreshResponseType = AccessResponseType & {
  access_jwt: string;
};

type LogoutResponseType = {
  message: string;
  status: StatusType;
};

type KakaoCallbackResponseType = {
  email: string;
  id: number;
  gender: GenderType;
  age: number;
  name: string;
  provider: ProviderType;
  message: string;
  status: StatusType;
  access_jwt: string;
};

type UserAtomType = {
  id: number;
  email: string;
  name?: string | '';
  isLogged: boolean;
  age?: number;
  gender?: GenderType;
  provider: ProviderType;
};

type StatusType = 'success' | 'error' | 'warning' | 'info' | '';

type GenderType = 'male' | 'female' | '';

type ProviderType = 'local' | 'kakao' | '';
