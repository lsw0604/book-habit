import { ColorType } from 'types/style';
import { dark, shadow, light, colors } from '../style/theme';
import { useRecoilState } from 'recoil';
import { colorAtom, themeAtom } from 'recoil/theme';

type Theme = 'light' | 'dark';

export default function useThemeHook() {
  const [theme, setTheme] = useRecoilState(themeAtom);
  const [color, setColor] = useRecoilState(colorAtom);

  const toggleHandler = (): void => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
    window.localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  const colorHandler = (color: ColorType) => {
    window.localStorage.setItem('color-theme', color);
    setColor(color);
  };

  const themeMode =
    theme === 'light'
      ? { mode: light, shadow, colors: colors[color] }
      : { mode: dark, shadow, colors: colors[color] };

  return {
    theme: themeMode,
    toggleHandler,
    isOn: theme === 'light',
    colorHandler,
    color,
  };
}
