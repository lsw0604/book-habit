import { ThemeProvider } from 'styled-components';

import GlobalStyle from './style/globalStyle';
import useTheme from '@hooks/useTheme';
import Router from 'pages/Router';
import { dark, light, shadow } from './style/theme';

const App = () => {
  const { theme, toggleTheme } = useTheme();
  const mode =
    theme === 'light' ? { mode: light, shadow } : { mode: dark, shadow };

  return (
    <>
      <ThemeProvider theme={mode}>
        <GlobalStyle />
        <Router onToggle={toggleTheme} />
      </ThemeProvider>
    </>
  );
};

export default App;
