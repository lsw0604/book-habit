import { SizeType } from 'types/style';

export const size: Record<
  SizeType,
  Record<'width' | 'height' | 'border-radius', number>
> = {
  xs: {
    width: 42,
    height: 12,
    'border-radius': 10,
  },
  sm: {
    width: 52,
    height: 22,
    'border-radius': 20,
  },
  md: {
    width: 62,
    height: 32,
    'border-radius': 30,
  },
  lg: {
    width: 72,
    height: 42,
    'border-radius': 40,
  },
  xl: {
    width: 82,
    height: 52,
    'border-radius': 50,
  },
};
