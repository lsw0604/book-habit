import { ThemeProvider } from 'styled-components';
import { ReactElement } from 'react';
import GlobalStyle from './style/globalStyle';
import Router from 'pages/Router';
import Toast from 'components/common/Toast';
import useThemeHook from '@hooks/useThemeHook';
import useAccessHook from '@hooks/useAccessHook';
import { HelmetProvider } from 'react-helmet-async';

export default function App(): ReactElement {
  const { theme } = useThemeHook();
  useAccessHook();

  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router />
        <Toast />
        <div id="root-modal" />
      </ThemeProvider>
    </HelmetProvider>
  );
}
