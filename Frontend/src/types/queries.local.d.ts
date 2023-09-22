// useLocalLoginMutation의 타입들

type LocalLoginMutationResponseType = {
  id: number;
  name: string;
  email: string;
  gender: GenderType;
  age: number;
  provider: ProviderType;
  access_jwt: string;
  message: string;
  status: StatusType;
  profile: string;
};

type LocalLoginMutationRequestType = {
  email: string;
  password: string;
};

// useLocalSignUpMutation의 타입들

type LocalSignUpMutationResponseType = {
  message: string;
  status: StatusType;
};

type LocalSignUpMutationRequestType = {
  email: string;
  password: string;
  name: string;
  gender: GenderType;
  age: number;
};
