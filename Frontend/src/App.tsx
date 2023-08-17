import { ThemeProvider } from 'styled-components';
import { ReactElement } from 'react';
import '@fontsource/noto-sans-kr/400.css';
import '@fontsource/noto-sans-kr/700.css';

import GlobalStyle from './style/globalStyle';
import Router from 'pages/Router';
import Toast from 'components/common/Toast';
import ModalPortal from 'components/common/ModalPortal';
import BottomSheet from 'components/BottomSheet';
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
        <ModalPortal>
          <BottomSheet />
        </ModalPortal>
        <div id="root-modal" />
      </ThemeProvider>
    </>
  );
}
