import { SizeType } from 'types/style';

export const size: Record<SizeType, Record<'width' | 'height', number>> = {
  xs: {
    width: 12,
    height: 12,
  },
  sm: {
    width: 18,
    height: 18,
  },
  md: {
    width: 24,
    height: 24,
  },
  lg: {
    width: 30,
    height: 30,
  },
  xl: {
    width: 36,
    height: 36,
  },
};
