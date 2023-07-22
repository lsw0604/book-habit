import { ThemeProvider } from 'styled-components';
import { useSetRecoilState } from 'recoil';

import { refreshAPI } from 'lib/api/auth';
import GlobalStyle from './style/globalStyle';
import useTheme from '@hooks/useTheme';
import Router from 'pages/Router';
import { dark, light, shadow, colors } from './style/theme';
import useColorTheme from '@hooks/useColor';
import { axios } from './lib/api';
import cookie from 'lib/utils/cookies';
import { userAtom } from 'recoil/user';

const App = () => {
  const { theme, onToggle } = useTheme();
  const { selectedColor, colorHandler } = useColorTheme();

  const setUserState = useSetRecoilState(userAtom);

  const { setAccessCookie } = cookie();

  const mode =
    theme === 'light' ? { mode: light, shadow } : { mode: dark, shadow };

  const colorMode = { ...mode, colors: colors[selectedColor] };

  const isOn = theme === 'light' ? true : false;

  axios.interceptors.request.use((config) => {
    return config;
  });

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      console.log(error.response.status);
      if (error.response && error.response.status === 403) {
        const { email, id, name, access } = await refreshAPI();
        setAccessCookie(access);
        if (email && id && name) {
          setUserState({ email, id, name });
        }
      }
    }
  );

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
