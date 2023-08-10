import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from '../components/header/Header';
import Home from './HomePage';
import Login from './LoginPage';
import Kakao from './KakaoPage';
import KakaoRegister from './KakaoRegisterPage';
import Register from './RegisterPage';
import MyProfile from 'components/user/MyProfile';
import DefaultLayout from './layout/DefaultLayout';
import PublicLayout from './layout/PublicLayout';
import AuthLayout from './layout/AuthLayout';
import KakaoLayout from './layout/KakaoLayout';

export default function Router() {
  return (
    <BrowserRouter>
      <header>
        <Header />
      </header>
      <main>
        <section>
          <DefaultLayout>
            <Routes>
              <Route path="/register/kakao" Component={KakaoRegister} />
              <Route element={<KakaoLayout />}>
                <Route path="/" Component={Home} />
                <Route element={<PublicLayout />}>
                  <Route path="/login" Component={Login} />
                  <Route path="/login/kakao" Component={Kakao} />
                  <Route path="/register" Component={Register} />
                </Route>
                <Route element={<AuthLayout />}>
                  <Route path="/profile/:id" Component={MyProfile} />
                </Route>
              </Route>
            </Routes>
          </DefaultLayout>
        </section>
      </main>
    </BrowserRouter>
  );
}
