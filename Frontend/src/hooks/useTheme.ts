import { useState, useEffect } from 'react';

export function useDarkMode() {
  const getInitialTheme = (): 'light' | 'dark' => {
    const storedTheme = window.localStorage.getItem('theme');
    return storedTheme ? (storedTheme as 'light' | 'dark') : 'light';
  };

  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);

  useEffect(() => {
    const isSystemTheme =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (isSystemTheme && theme === 'light') {
      setTheme('dark');
    }
  }, [theme]);

  function toggleTheme() {
    if (theme === 'light') {
      window.localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else if (theme === 'dark') {
      window.localStorage.setItem('theme', 'light');
      setTheme('light');
    }
  }

  return { theme, toggleTheme };
}
