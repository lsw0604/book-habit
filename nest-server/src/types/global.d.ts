declare global {
  namespace Express {
    interface User {
      id: number;
      email: string | null;
      password: string | null;
      name: string | null;
      birthday: Date | null;
      gender: $Enums.Gender | null;
      provider: $Enums.Provider | null;
      profile: string | null;
    }

    interface Request {
      2;
      user?: User;
    }
  }
}

export {};
