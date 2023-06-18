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
        <Button size="xl" onClick={onChangeTheme} icon="Female">
          Female
        </Button>
        <br />
        <Button icon="Female" size="lg" onClick={onChangeTheme}>
          Female
        </Button>
        <br />
        <Button onClick={onChangeTheme} icon="Female" size="md">
          Female
        </Button>
        <br />
        <Button icon="Female" size="sm" color="red">
          Female
        </Button>
        <br />
        <Button icon="Female" size="xs">
          Female
        </Button>
        <br />
      </ThemeProvider>
    </div>
  );
};

export default App;
