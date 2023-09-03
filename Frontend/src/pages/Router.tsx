import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from 'components/header/Header';
import BottomNavigation from 'components/BottomNavigation';

import Home from './HomePage';
import Login from './LoginPage';
import Kakao from './KakaoPage';
import Search from './SearchPage';
import KakaoRegister from './KakaoRegisterPage';
import Register from './RegisterPage';
import MyBooks from './MyBooksPage';
import MyBooksInfo from './MyBooksInfoPage';

import DefaultLayout from './layout/DefaultLayout';
import IsAuthLayout from './layout/IsAuthLayout';
import IsKakaoAuthLayout from './layout/IsKakaoAuthLayout';

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
              <Route element={<IsKakaoAuthLayout isKakaoRegister={true} />}>
                <Route path="/register/kakao" Component={KakaoRegister} />
              </Route>
              <Route element={<IsKakaoAuthLayout isKakaoRegister={false} />}>
                <Route path="/" Component={Home} />
                <Route path="/search" Component={Search} />
                <Route element={<IsAuthLayout isAuth={true} />}>
                  <Route path="/my_books" Component={MyBooks} />
                  <Route
                    path="/my_books/:users_books_id"
                    Component={MyBooksInfo}
                  />
                </Route>
                <Route element={<IsAuthLayout isAuth={false} />}>
                  <Route path="/login" Component={Login} />
                  <Route path="/login/kakao" Component={Kakao} />
                  <Route path="/register" Component={Register} />
                </Route>
              </Route>
            </Routes>
          </DefaultLayout>
        </section>
      </main>
      <footer>
        <BottomNavigation />
      </footer>
    </BrowserRouter>
  );
}
