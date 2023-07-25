type SignUpRequestType = {
  email: string;
  password: string;
  name: string;
};

type SignUpResponseType = {
  message: string;
  status: 'success' | 'error';
};

type LoginRequestType = {
  email: string;
  password: string;
};

type LoginResponseType = {
  id: number;
  name: string;
  email: string;
  message: string;
  status: 'success' | 'error';
};

type AccessResponseType = {
  id?: number;
  name: string;
  email: string;
  message: string;
  status: 'success' | 'error';
};

type RefreshResponseType = {
  id?: number;
  name: string;
  email: string;
  message: string;
  status: 'success' | 'error';
  access: string;
};

type LogoutResponseType = {
  message: string;
  status: 'success' | 'error';
};
