import { ThemeProvider } from 'styled-components';
import GlobalStyle from './style/globalStyle';
import { useDarkMode } from '@hooks/useDarkMode';
import Button from './components/common/Button/index';
import IconButton from 'components/common/Button/Icon';
import Switch from 'components/common/Toggle';
import { useState } from 'react';

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
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}
        >
          <IconButton size="xs" icon="Beach" />
          <IconButton size="sm" icon="Beach" />
          <IconButton size="md" icon="Beach" />
          <IconButton size="lg" icon="Beach" />
          <IconButton size="xl" icon="Beach" />
        </div>
        <Switch />
        <input
          type="checkbox"
          value={value}
          onChange={() => {
            setOnValue('sss');
            console.log(onValue);
          }}
        />
      </ThemeProvider>
    </div>
  );
};

export default App;
