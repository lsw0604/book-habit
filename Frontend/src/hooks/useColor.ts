import { ColorNumType, ColorType } from '../types/style';
import { customize } from '../style/colors';

export function useColor(color: ColorType, colorNum: ColorNumType) {
  const colors = customize[color];
  return colors[colorNum];
}
