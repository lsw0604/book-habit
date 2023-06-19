declare module 'styled-components' {
  export interface DefaultTheme {
    mode: {
      /** background */
      bg_main: string;
      bg_sub: string;
      bg_toggle: string;
      bg_header: string;
      /** border */
      border_main: string;
      border_sub: string;
      /** Typography */
      typo_main: string;
      typo_sub: string;
      typo_black: string;
      typo_info: string;
      typo_success: string;
      typo_failure: string;
      typo_warning: string;
      typo_disabled: string;
      /** validation */
      validate_main: string;
      validate_sub: string;
      /** blue */
      blue_main: string;
      blue_sub: string;
    };
    shadow: Record<
      'sm' | 'n' | 'md' | 'lg' | 'xl' | 'xxl' | 'inner' | 'none',
      string
    >;
  }
}

export type IconType =
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
  | 'Upload';

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
