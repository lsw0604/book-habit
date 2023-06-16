import { css } from 'styled-components';
import { ColorModeType, ColorNumType, ColorType, SizeType } from 'types/style';
import { size } from '../components/common/Button/size';
import { useColor } from './useColor';

export function useButtonMode() {
  const getSizeNormalButton = (ctx: SizeType) => {
    return css`
      height: ${size[ctx].height};
      width: ${size[ctx].width};
      font-size: ${size[ctx].fontSize};
    `;
  };

  const getIsFillModeNormalButton = (
    mode: ColorModeType,
    color: ColorType,
    num: ColorNumType
  ) => {
    if (mode === 'fill') {
      return css`
        background-color: ${color && num
          ? useColor(color, num)
          : ({ theme }) => theme.mode.typo_main};
      `;
    } else if (mode === 'isFill') {
      return css``;
    }
  };

  return {
    getSizeNormalButton,
    getIsFillModeNormalButton,
  };
}
