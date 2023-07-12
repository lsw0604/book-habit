import { ThemeProvider } from 'styled-components';

import GlobalStyle from './style/globalStyle';
import useDarkMode from '@hooks/useTheme';
import Router from 'pages/Router';
import Header from 'components/header/Header';
import Home from 'pages/Home';
import Welcome from 'pages/Welcome';

import { dark, light, shadow } from './style/theme';

const App = () => {
  const { theme } = useDarkMode();

  const mode =
    theme === 'light' ? { mode: light, shadow } : { mode: dark, shadow };

  return (
    <>
      <ThemeProvider theme={mode}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </>
  );
};

export default App;
