import { useMemo } from 'react';

interface IProps {
  email: string;
  password: string;
  check_password?: string;
  name?: string;
  mode: 'login' | 'register';
}

export default function useValidateHook({
  email,
  password,
  check_password,
  name,
  mode,
}: IProps) {
  const PASSWORD_MIN_LENGTH = 8;
  let validate;

  const isEmailValid = useMemo(
    () => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email),
    [email]
  );

  const isPasswordHasNameOrEmail = useMemo(
    () =>
      !password ||
      !name ||
      password.includes(name) ||
      password.includes(email.split('@')[0]),
    [password, name, email]
  );

  const isPasswordOverMinLength = useMemo(
    () => !!password && password.length >= PASSWORD_MIN_LENGTH,
    [password]
  );

  const isPasswordHasNumberOrSymbol = useMemo(
    () =>
      !(
        /[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]/g.test(password) ||
        /[0-9]/g.test(password)
      ),
    [password]
  );

  const registerValidateForm = (): boolean => {
    if (!email || !name || !password) return false;
    if (password !== check_password) return false;
    if (
      isPasswordHasNameOrEmail ||
      !isPasswordOverMinLength ||
      isPasswordHasNumberOrSymbol
    )
      return false;
    return true;
  };

  const loginValidateForm = (): boolean => {
    if (!email || !password) return false;
    if (!isEmailValid) return false;
    return true;
  };
  if (mode === 'login') {
    validate = loginValidateForm();
  } else if (mode === 'register') {
    validate = registerValidateForm();
  }

  return {
    validate,
    isEmailValid,
    isPasswordHasNameOrEmail,
    isPasswordHasNumberOrSymbol,
    isPasswordOverMinLength,
  };
}
