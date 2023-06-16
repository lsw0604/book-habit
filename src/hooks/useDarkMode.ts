import { useState, useEffect, useCallback } from 'react';
import { dark, light, shadow } from '@style/theme';
import { DefaultTheme } from 'styled-components';

export const useDarkMode = (): [
  value: DefaultTheme,
  onChangeTheme: () => void
] => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const value =
    theme === 'light'
      ? { mode: light, shadow, toggle: true }
      : { mode: dark, shadow, toggle: false };

  const onChangeTheme = () => {
    if (theme === 'light') {
      console.log('light', window.localStorage.getItem('theme'));
      window.localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else {
      console.log('dark', window.localStorage.getItem('theme'));
      window.localStorage.setItem('theme', 'light');
      setTheme('light');
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    if (!localTheme) {
      window.localStorage.setItem('theme', 'light');
    }
  }, []);

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    if (localTheme === 'light') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }, []);

  return [value, onChangeTheme];
};
