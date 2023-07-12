declare module 'styled-components' {
  export interface DefaultTheme {
    mode: {
      main: string;
      sub: string;
      typo_main: string;
      typo_sub: string;
    };
    shadow: Record<
      'sm' | 'n' | 'md' | 'lg' | 'xl' | 'xxl' | 'inner' | 'none',
      string
    >;
    // color: Record<ColorType, string>;
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

export type SizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ColorType =
  | 'slate'
  | 'gray'
  | 'red'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'lime'
  | 'rose'
  | 'yellow';

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

export type ToggleIconTupleType<
  IconType,
  K extends number,
  T extends IconType[] = []
> = T['length'] extends K ? T : IconTuple<IconType, K, [...T, IconType]>;

export type NormalButtonSizeType = Record<
  SizeType,
  Record<'height' | 'lineHeight' | 'fontSize', number>
>;

export type IconButtonSizeType = Record<
  SizeType,
  Record<'width' | 'height', number>
>;

export type ColorModeType = 'fill' | 'isFill';

export type ColorStateType = Record<ColorType, Record<ColorNumType, string>>;
