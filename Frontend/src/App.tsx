import { ThemeProvider } from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { useEffect } from 'react';

import { accessAPI } from 'lib/api/auth';
import GlobalStyle from './style/globalStyle';
import useTheme from '@hooks/useTheme';
import Router from 'pages/Router';
import { dark, light, shadow, colors } from './style/theme';
import useColorTheme from '@hooks/useColor';
import { userAtom } from 'recoil/user';

const App = () => {
  const { theme, onToggle } = useTheme();
  const { selectedColor, colorHandler } = useColorTheme();

  const setUserState = useSetRecoilState(userAtom);

  const mode =
    theme === 'light' ? { mode: light, shadow } : { mode: dark, shadow };

  const colorMode = { ...mode, colors: colors[selectedColor] };

  const isOn = theme === 'light' ? true : false;

  useEffect(() => {
    if (document.cookie.includes('access')) {
      const fetchApi = async () => {
        try {
          const { id, name, email } = await accessAPI();
          if (id) {
            setUserState({ id, name, email, isLogged: true });
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          if (
            error?.status === 'success' &&
            error.id &&
            error.name &&
            error.email
          ) {
            setUserState({
              id: error.id,
              name: error.name,
              email: error.email,
              isLogged: true,
            });
          }

          if (error?.status === 'success' && error?.message) {
            console.log(error.message);
          } else {
            console.log('UseEffect [ERROR]', error);
          }
        }
      };

      fetchApi();
    }
  }, []);

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
