import { useState, useEffect } from 'react';
import { ColorType } from 'types/style';
import { dark, shadow, light, colors } from '../style/theme';

type Theme = 'light' | 'dark';

const useTheme = () => {
  const getInitialTheme = (): Theme => {
    const localTheme = window.localStorage.getItem('theme');
    if (localTheme === 'dark' || localTheme === 'light') {
      return localTheme;
    }
    const systemTheme = window.matchMedia?.(
      '(prefers-color-scheme: dark)'
    ).matches;
    return systemTheme ? 'dark' : 'light';
  };

  const getInitialColor = (): ColorType => {
    const localColor = window.localStorage.getItem('color-theme') as ColorType;
    return localColor || 'orange';
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [selectedColor, setSelectedColor] =
    useState<ColorType>(getInitialColor);

  const onToggle = (): void => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
    window.localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  const colorHandler = (color: ColorType) => {
    window.localStorage.setItem('color-theme', color);
    setSelectedColor(color);
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

    const mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)');
    mediaQuery?.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery?.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  useEffect(() => {
    if (!window.localStorage.getItem('color-theme')) {
      setSelectedColor('orange');
      window.localStorage.setItem('color-theme', 'orange');
    }
  }, []);

  const themeMode =
    theme === 'light'
      ? { mode: light, shadow, colors: colors[selectedColor] }
      : { mode: dark, shadow, colors: colors[selectedColor] };

  return {
    theme: themeMode,
    onToggle,
    isOn: theme === 'light',
    colorHandler,
    selectedColor,
  };
};

export default useTheme;
