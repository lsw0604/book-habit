import { useState, useEffect } from 'react';
import { ColorType } from '../types/style';

const useColorTheme = () => {
  const [selectedColor, setSelectedColor] = useState<ColorType>(() => {
    const localTheme = window.localStorage.getItem('color-theme');

    if (localTheme) {
      return localTheme as ColorType;
    } else {
      return 'orange';
    }
  });

  function colorHandler(color: ColorType) {
    window.localStorage.setItem('color-theme', color);
    setSelectedColor(color);
  }

  useEffect(() => {
    const localTheme = window.localStorage.getItem('color-theme');
    if (!localTheme) {
      setSelectedColor('orange');
      window.localStorage.setItem('color-theme', 'orange');
    } else {
      setSelectedColor(localTheme as ColorType);
    }
  }, []);

  return { selectedColor, colorHandler };
};

export default useColorTheme;
