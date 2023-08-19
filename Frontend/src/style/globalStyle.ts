import { createGlobalStyle, css } from 'styled-components';
import reset from 'styled-reset';
import '@fontsource/noto-sans-kr/400.css';
import '@fontsource/noto-sans-kr/700.css';

const globalStyle = css`
  ${reset};
  * {
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
  }
  body {
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 700;
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
