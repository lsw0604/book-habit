import { ThemeProvider } from 'styled-components';
import GlobalStyle from './style/globalStyle';
import { useDarkMode } from '@hooks/useDarkMode';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Sidebar from 'components/sidebar/Sidebar';
import Home from './pages/Home';
import User from 'pages/User';
import Mail from 'pages/Mail';

const App = () => {
  const [value, onChangeTheme] = useDarkMode();

  return (
    <>
      <Router>
        <ThemeProvider theme={value}>
          <GlobalStyle />
          <Sidebar>
            <Routes>
              <Route path="/" Component={Home} />
              <Route path="/users" Component={User} />
              <Route path="/mail" Component={Mail} />
            </Routes>
          </Sidebar>
        </ThemeProvider>
      </Router>
    </>
  );
};

export default App;
