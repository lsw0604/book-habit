import Icon from './components/common/Icon';
import GlobalStyle from './style/globalStyle';
import { ReactComponent as IconBeach } from './assets/icons/iconBeach.svg';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Icon icon={<IconBeach />} width={100} height={100} />
    </>
  );
};

export default App;
