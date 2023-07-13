import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/header/Header';

import DesktopLayout from './layout/DesktopLayout';
import Home from './Home';
import Login from './user/Login';
import Register from './user/Register';
import MyProfile from './user/MyProfile';

export default function Router({ onToggle }: { onToggle: () => void }) {
  return (
    <BrowserRouter>
      <Header onToggle={onToggle} />
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
