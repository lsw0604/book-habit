import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/header/Header';

import DesktopLayout from './layout/DesktopLayout';
import Home from './Home';
import Login from './user/Login';
import Register from './user/Register';
import MyProfile from './user/MyProfile';
import { ColorType } from 'types/style';

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
      <DesktopLayout>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/myprofile" Component={MyProfile} />
        </Routes>
      </DesktopLayout>
    </BrowserRouter>
  );
}
