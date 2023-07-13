import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

const useTheme = (): { theme: Theme; toggleTheme: () => void } => {
  const [theme, setTheme] = useState<Theme>(() => {
    const localTheme = window.localStorage.getItem('theme');
    if (localTheme === 'dark' || localTheme === 'light') {
      return localTheme;
    }
    const systemTheme =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    return systemTheme ? 'dark' : 'light';
  });

  const toggleTheme = (): void => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
    window.localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  useEffect(() => {
    const handleSystemThemeChange = (e: MediaQueryListEvent): void => {
      const systemTheme: Theme = e.matches ? 'dark' : 'light';
      const localTheme = window.localStorage.getItem('theme');
      if (!localTheme) {
        setTheme(systemTheme);
        window.localStorage.setItem('theme', systemTheme);
      }
    };

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  return { theme, toggleTheme };
};

export default useTheme;
