type SignUpRequestType = {
  email: string;
  password: string;
  name: string;
};

type SignUpResponseType = {
  message: string;
  status: 'success' | 'failure';
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
  status: 'success' | 'failure';
};

type AccessResponseType = {
  id?: number;
  name: string;
  email: string;
  message: string;
  status: 'success' | 'failure';
};

type RefreshResponseType = {
  id?: number;
  name: string;
  email: string;
  message: string;
  status: 'success' | 'failure';
  access: string;
};

type LogoutResponseType = {
  message: string;
  status: 'success' | 'failure';
};
