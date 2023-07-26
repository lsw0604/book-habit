import { ThemeProvider } from 'styled-components';
import { ReactElement } from 'react';

import GlobalStyle from './style/globalStyle';
import useTheme from '@hooks/useThemeHook';
import Router from 'pages/Router';
import useAccessHook from '@hooks/useAccessHook';
import Toast from 'components/common/Toast';

export default function App(): ReactElement {
  const { theme, onToggle, isOn, selectedColor, colorHandler } = useTheme();

  useAccessHook();

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router
          isOn={isOn}
          onToggle={onToggle}
          selectedColor={selectedColor}
          colorHandler={colorHandler}
        />
        <Toast />
      </ThemeProvider>
    </>
  );
}
