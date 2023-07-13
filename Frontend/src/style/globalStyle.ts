import { createGlobalStyle, css } from 'styled-components';
import reset from 'styled-reset';

const globalStyle = css`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    font-family: 'SUIT', 'Noto Sans';
    font-weight: 700;
    background: ${({ theme }) => theme.mode.main};
    color: ${({ theme }) => theme.mode.typo_main};
    position: relative;
    line-height: 1.5rem;
    margin: 0 auto;
    width: 100%;
    height: 100%;
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
