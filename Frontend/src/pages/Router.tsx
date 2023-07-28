import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/header/Header';

import { ColorType } from 'types/style';
import Home from './Home';
import Login from './LoginPage';
import Register from './RegisterPage';
import MyProfile from 'components/user/MyProfile';
import DefaultLayout from './layout/DefaultLayout';
import PublicLayout from './layout/PublicLayout';
import AuthLayout from './layout/AuthLayout';

interface IProps {
  isOn: boolean;
  onToggle: () => void;
  selectedColor: ColorType;
  colorHandler: (color: ColorType) => void;
}

export default function Router({
  onToggle,
  isOn,
  selectedColor,
  colorHandler,
}: IProps) {
  return (
    <BrowserRouter>
      <Header
        onToggle={onToggle}
        isOn={isOn}
        selectedColor={selectedColor}
        colorHandler={colorHandler}
      />
      <DefaultLayout>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" Component={Home} />
            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Register} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/profile/:id" Component={MyProfile} />
          </Route>
        </Routes>
      </DefaultLayout>
    </BrowserRouter>
  );
}
