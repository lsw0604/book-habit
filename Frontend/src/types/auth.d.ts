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
  message: string;
  status: StatusType;
};

type AccessResponseType = {
  id: number;
  name: string;
  email: string;
  message: string;
  gender: GenderType;
  age: number;
  status: StatusType;
  provider: ProviderType;
};

type RefreshResponseType = {
  id: number;
  name: string;
  email: string;
  gender: GenderType;
  age: number;
  message: string;
  status: StatusType;
};

type LogoutResponseType = {
  message: string;
  status: StatusType;
};

type StatusType = 'success' | 'error' | 'warning' | 'info' | '';

type GenderType = 'male' | 'female' | '';

type ProviderType = 'local' | 'kakao' | '';
