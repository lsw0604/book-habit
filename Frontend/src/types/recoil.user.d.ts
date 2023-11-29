type UserAtomType = {
  id: number;
  email: string;
  name?: string | '';
  isLogged: boolean;
  age?: number;
  gender?: GenderType;
  provider: ProviderType;
  profile: string;
};
