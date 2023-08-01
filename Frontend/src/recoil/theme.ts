import { atom } from 'recoil';
import { ColorType, SystemTheme } from 'types/style';

const THEME_ATOM_KEY = 'THEME_ATOM_KEY';
const COLOR_THEME_ATOM_KEY = 'COLOR_THEME_ATOM_KEY';

const localTheme = window.localStorage.getItem('theme');
const systemTheme = window.matchMedia?.('(prefers-color-scheme: dark)').matches;

const localColor = window.localStorage.getItem('color-theme') as ColorType;

export const themeAtom = atom<SystemTheme>({
  key: THEME_ATOM_KEY,
  default:
    localTheme === 'dark' || localTheme === 'light'
      ? localTheme
      : systemTheme
      ? 'dark'
      : 'light',
});

export const colorAtom = atom<ColorType>({
  key: COLOR_THEME_ATOM_KEY,
  default: localColor === null ? 'orange' : localColor,
});
