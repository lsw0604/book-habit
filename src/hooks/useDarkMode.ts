import { useState, useEffect } from 'react';

export const useDarkMode = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const onChangeTheme = () => {
    if (theme === 'light') {
      window.localStorage.setItem('theme', 'light');
      setTheme('light');
    } else {
      window.localStorage.setItem('theme', 'dark');
      setTheme('dark');
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    if (localTheme === 'light') {
      setTheme('light');
    } else if (localTheme === 'dark') {
      setTheme('dark');
    }
    return () => {};
  }, [theme]);
};
