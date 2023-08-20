import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from '../components/header/Header';
import Home from './HomePage';
import Login from './LoginPage';
import Kakao from './KakaoPage';
import Search from './SearchPage';
import KakaoRegister from './KakaoRegisterPage';
import Register from './RegisterPage';
import MyProfile from './Profile';
import DefaultLayout from './layout/DefaultLayout';
import PublicLayout from './layout/PublicLayout';
import AuthLayout from './layout/AuthLayout';
import KakaoLayout from './layout/KakaoLayout';
import KakaoRegisterLayout from './layout/KakaoRegisterLayout';

export default function Router({ isLoading }: { isLoading: boolean }) {
  return (
    <BrowserRouter>
      <header>
        <Header isLoading={isLoading} />
      </header>
      <main>
        <section>
          <DefaultLayout>
            <Routes>
              <Route element={<KakaoRegisterLayout />}>
                <Route path="/register/kakao" Component={KakaoRegister} />
              </Route>
              <Route element={<KakaoLayout />}>
                <Route path="/" Component={Home} />
                <Route path="/search" Component={Search} />
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
