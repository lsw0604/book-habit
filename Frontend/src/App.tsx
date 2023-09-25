import { ThemeProvider } from 'styled-components';
import { ReactElement } from 'react';

import GlobalStyle from './style/globalStyle';
import Router from 'pages/Router';
import Toast from 'components/common/Toast';
import useThemeHook from '@hooks/useThemeHook';
import useAccessHook from '@hooks/useAccessHook';

export default function App(): ReactElement {
  const { theme } = useThemeHook();
  const isLoading = useAccessHook();

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router isLoading={isLoading} />
        <Toast />
        <div id="root-modal" />
      </ThemeProvider>
    </>
  );
}
