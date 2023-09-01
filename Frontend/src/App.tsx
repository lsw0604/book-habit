import { ThemeProvider } from 'styled-components';
import { ReactElement } from 'react';

import GlobalStyle from './style/globalStyle';
import Router from 'pages/Router';
import Toast from 'components/common/Toast';
import ModalPortal from 'components/common/ModalPortal';
import BottomSheet from 'components/common/BottomSheet';
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
