import { css } from 'styled-components';
import { SizeType } from 'types/style';
import { size } from '../components/common/Button/size';

export function useButtonMode() {
  const getSizeNormalButton = (ctx: SizeType) => {
    return css`
      height: ${size[ctx].height}px;
      line-height: ${size[ctx].lineHeight}px;
      font-size: ${size[ctx].fontSize}px;
    `;
  };
  return {
    getSizeNormalButton,
  };
}
