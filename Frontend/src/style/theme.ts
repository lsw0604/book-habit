import { customize } from '@style/colors';

export const light = {
  /** Background */
  bg_main: customize.slate['50'],
  bg_sub: customize.slate['100'],
  bg_toggle: '#38BDF8',
  bg_header: customize.slate['50'],
  /** border */
  border_main: customize.slate['700'],
  border_sub: customize.slate['600'],
  /** Typography */
  typo_main: customize.slate['700'],
  typo_sub: customize.slate['600'],
  typo_black: customize.gray['900'],
  typo_info: customize.sky['400'],
  typo_success: customize.teal['400'],
  typo_failure: customize.red['400'],
  typo_warning: customize.yellow['400'],
  typo_disabled: customize.gray['400'],
  /** validation */
  validate_main: customize.rose['400'],
  validate_sub: customize.rose['300'],
  /** blue */
  blue_main: '#A4B4FC',
  blue_sub: '#38BDF8',
};

export const dark = {
  /** Background */
  bg_main: customize.slate['800'],
  bg_sub: customize.slate['700'],
  bg_toggle: customize.yellow['500'],
  bg_header: customize.slate['700'],
  /** border */
  border_main: customize.slate['500'],
  border_sub: customize.slate['300'],
  /** Typography */
  typo_main: customize.slate['500'],
  typo_sub: customize.slate['300'],
  typo_black: customize.gray['900'],
  typo_info: customize.sky['400'],
  typo_success: customize.teal['400'],
  typo_failure: customize.red['400'],
  typo_warning: customize.yellow['400'],
  typo_disabled: customize.gray['400'],
  /** validation */
  validate_main: customize.rose['400'],
  validate_sub: customize.rose['300'],
  /** blue */
  blue_main: '#A4B4FC',
  blue_sub: '#38BDF8',
};

export const shadow = {
  n: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  none: '0 0 #0000',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  xxl: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
};
