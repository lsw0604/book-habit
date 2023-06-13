import { createGlobalStyle, css } from 'styled-components';
import reset from 'styled-reset';

const globalStyle = css`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    font-family: Noto sans, Noto Sans KR;
  }
  a {
    text-decoration: none;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;

const GlobalStyle = createGlobalStyle`
  ${globalStyle};
`;

export default GlobalStyle;
