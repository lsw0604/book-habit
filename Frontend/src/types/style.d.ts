declare module 'styled-components' {
  export interface DefaultTheme {
    mode: {
      main: string;
      sub: string;
      typo_main: string;
      typo_sub: string;
      typo_white: string;
    };
    shadow: Record<
      'sm' | 'n' | 'md' | 'lg' | 'xl' | 'xxl' | 'inner' | 'none',
      string
    >;
    colors: Record<'main' | 'sub' | 'font', string>;
  }
}

export type IconType =
  | 'Star'
  | 'Mail'
  | 'X'
  | 'Male'
  | 'Female'
  | 'Error'
  | 'Success'
  | 'Warning'
  | 'Info'
  | 'OpenEye'
  | 'ClosedEye'
  | 'Person'
  | 'WarningCircle'
  | 'Sunny'
  | 'Beach'
  | 'CloudyParty'
  | 'Map'
  | 'Support'
  | 'UpArrow'
  | 'DownArrow'
  | 'Hamburger'
  | 'RightArrow'
  | 'LeftArrow'
  | 'Plus'
  | 'Pencil'
  | 'TrashCan'
  | 'Upload'
  | 'Image'
  | 'Search'
  | 'Home';

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
