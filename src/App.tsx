import { ThemeProvider } from 'styled-components';
import GlobalStyle from './style/globalStyle';
import { useDarkMode } from '@hooks/useDarkMode';
import Button from './components/common/Button/index';

const App = () => {
  const [value, onChangeTheme] = useDarkMode();

  return (
    <div>
      <ThemeProvider theme={value}>
        <GlobalStyle />
        <br />
        <Button onClick={onChangeTheme} icon="Female" color="cyan">
          Female
        </Button>
        <br />
        <Button
          icon="Female"
          colorMode="isFill"
          size="lg"
          onClick={onChangeTheme}
        >
          Female
        </Button>
        <br />
        <Button
          onClick={onChangeTheme}
          icon="Female"
          colorMode="fill"
          size="md"
        >
          Female
        </Button>
        <br />
        <Button icon="Female" colorMode="fill" size="sm">
          Female
        </Button>
        <br />
        <Button icon="Female" colorMode="fill" size="xs">
          Female
        </Button>
        <br />
      </ThemeProvider>
    </div>
  );
};

export default App;
