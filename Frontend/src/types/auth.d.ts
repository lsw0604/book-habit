type SignUpRequestType = {
  email: string;
  password: string;
  name: string;
  gender: 'male' | 'female';
  age: number;
};

type SignUpResponseType = {
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
  gender: 'male' | 'female';
  age: number;
  message: string;
  status: StatusType;
};

type AccessResponseType = {
  id: number;
  name: string;
  email: string;
  message: string;
  gender: 'female' | 'male';
  age: number;
  status: StatusType;
};

type RefreshResponseType = {
  id: number;
  name: string;
  email: string;
  message: string;
  status: StatusType;
};

type LogoutResponseType = {
  message: string;
  status: StatusType;
};

type StatusType = 'success' | 'error' | 'warning' | 'info' | '';
