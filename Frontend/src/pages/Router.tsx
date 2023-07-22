import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/header/Header';

import Home from './Home';
import Login from 'components/user/Login';
import Register from 'components/user/Register';
import MyProfile from 'components/user/MyProfile';
import { ColorType } from 'types/style';
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
      <AuthLayout>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/myprofile" Component={MyProfile} />
        </Routes>
      </AuthLayout>
    </BrowserRouter>
  );
}
