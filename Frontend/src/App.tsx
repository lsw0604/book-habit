import { ThemeProvider } from 'styled-components';
import GlobalStyle from './style/globalStyle';
import { useDarkMode } from '@hooks/useDarkMode';

import Router from 'pages/Router';
import Header from 'components/header/Header';
import Home from 'pages/Home';
import Welcome from 'pages/Welcome';

const App = () => {
  const [value, onChangeTheme] = useDarkMode();

  return (
    <>
      <ThemeProvider theme={value}>
        <Header></Header>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </>
  );
};

export default App;
