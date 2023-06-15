import { ThemeProvider } from 'styled-components';
import Toggle from './components/common/Toggle';
import GlobalStyle from './style/globalStyle';
import { useDarkMode } from '@hooks/useDarkMode';
import { useState } from 'react';

const App = () => {
  const [value, onChangeTheme, toggle] = useDarkMode();

  const [vl, setVl] = useState<boolean>(true);

  const onChange = () => {
    setVl((prev) => !prev);
  };
  console.log(value);

  return (
    <div>
      <ThemeProvider theme={value}>
        <GlobalStyle />
        <Toggle
          style={{ position: 'fixed', right: '5px', bottom: '5px' }}
          id="toggle"
          ToggleSwitch={toggle}
          icon={['Sunny', 'CloudyParty']}
          size="md"
          onClick={onChangeTheme}
        />
      </ThemeProvider>
    </div>
  );
};

export default App;
