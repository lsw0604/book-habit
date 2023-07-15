import { ThemeProvider } from 'styled-components';

import GlobalStyle from './style/globalStyle';
import useTheme from '@hooks/useTheme';
import Router from 'pages/Router';
import { dark, light, shadow, colors } from './style/theme';
import useColorTheme from '@hooks/useColor';

const App = () => {
  const { theme, onToggle } = useTheme();
  const { selectedColor, colorHandler } = useColorTheme();
  const mode =
    theme === 'light' ? { mode: light, shadow } : { mode: dark, shadow };

  const colorMode = { ...mode, colors: colors[selectedColor] };

  const isOn = theme === 'light' ? true : false;

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
      </ThemeProvider>
    </>
  );
};

export default App;
