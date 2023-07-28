import { customize } from '@style/colors';
import { ColorType } from 'types/style';

export const light = {
  main: customize.slate['50'],
  sub: customize.slate['200'],
  typo_main: customize.slate['900'],
  typo_sub: customize.slate['500'],
  typo_white: customize.slate['50'],
};

export const dark = {
  main: customize.slate['700'],
  sub: customize.slate['600'],
  typo_main: customize.slate['50'],
  typo_sub: customize.slate['300'],
  typo_white: customize.slate['50'],
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

type T = 'main' | 'sub' | 'spinner';

export const colors: Record<ColorType, Record<T, string>> = {
  sky: {
    main: customize.sky['500'],
    sub: customize.sky['400'],
    spinner: customize.sky['300'],
  },

  cyan: {
    main: customize.cyan['500'],
    sub: customize.cyan['400'],
    spinner: customize.cyan['300'],
  },

  lime: {
    main: customize.lime['500'],
    sub: customize.lime['400'],
    spinner: customize.lime['300'],
  },

  rose: {
    main: customize.rose['500'],
    sub: customize.rose['400'],
    spinner: customize.rose['300'],
  },

  teal: {
    main: customize.teal['500'],
    sub: customize.teal['400'],
    spinner: customize.teal['300'],
  },

  yellow: {
    main: customize.yellow['500'],
    sub: customize.yellow['400'],
    spinner: customize.yellow['300'],
  },

  gray: {
    main: customize.gray['500'],
    sub: customize.gray['400'],
    spinner: customize.gray['300'],
  },
  red: {
    main: customize.red['500'],
    sub: customize.red['400'],
    spinner: customize.red['300'],
  },
  fuchsia: {
    main: customize.fuchsia['500'],
    sub: customize.fuchsia['400'],
    spinner: customize.fuchsia['300'],
  },
  slate: {
    main: customize.slate['500'],
    sub: customize.slate['400'],
    spinner: customize.slate['300'],
  },
  orange: {
    main: customize.orange['500'],
    sub: customize.orange['400'],
    spinner: customize.orange['300'],
  },
};
