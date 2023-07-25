import { ThemeProvider } from 'styled-components';

import GlobalStyle from './style/globalStyle';
import useTheme from '@hooks/useThemeHook';
import useColorTheme from '@hooks/useColorHook';
import Router from 'pages/Router';
import { dark, light, shadow, colors } from './style/theme';
import useAccessHook from '@hooks/useAccessHook';
import Toast from 'components/common/Toast';
import Debugger from 'lib/utils/Debugger';

const App = () => {
  const { theme, onToggle } = useTheme();
  const { selectedColor, colorHandler } = useColorTheme();

  const mode =
    theme === 'light' ? { mode: light, shadow } : { mode: dark, shadow };

  const colorMode = { ...mode, colors: colors[selectedColor] };

  const isOn = theme === 'light' ? true : false;

  if (document.cookie.includes('access')) {
    useAccessHook();
  }

  return (
    <>
      <ThemeProvider theme={colorMode}>
        <GlobalStyle />
        <Router
          isOn={isOn}
          onToggle={onToggle}
          selectedColor={selectedColor}
          colorHandler={colorHandler}
        />
        <Debugger />
        <Toast />
      </ThemeProvider>
    </>
  );
};

export default App;
