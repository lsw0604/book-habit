declare module 'styled-components' {
  export interface DefaultTheme {
    mode: {
      main: string;
      sub: string;
      nav: string;
      typo_main: string;
      typo_sub: string;
      typo_white: string;
    };
    shadow: Record<
      'sm' | 'n' | 'md' | 'lg' | 'xl' | 'xxl' | 'inner' | 'none',
      string
    >;
    colors: Record<'main' | 'sub' | 'spinner' | 'footer', string>;
  }
}

export type ColorType =
  | 'slate'
  | 'gray'
  | 'red'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'lime'
  | 'rose'
  | 'yellow'
  | 'orange'
  | 'fuchsia';

export type ColorNumType =
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

export type ColorStateType = Record<ColorType, Record<ColorNumType, string>>;

type CheckBoxOptionType<T> = {
  title: T;
  description?: string;
};

type RadioGroupOptionType<T> = {
  label: string;
  value: T;
  description?: string;
  icon?: JSX.Element;
};

type SystemTheme = 'light' | 'dark';
