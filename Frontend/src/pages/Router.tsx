import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import styled from 'styled-components';

import Header from 'components/header/Header';
import Loader from 'components/common/Loader';
import { BottomNavigationBar } from 'components/bottom/BottomNavigationBar';
import DefaultLayout from '@pages/layout/DefaultLayout';
import IsAuthLayout from '@pages/layout/IsAuthLayout';
import Home from '@pages/HomePage';
import IsKakaoAuthLayout from '@pages/layout/IsKakaoAuthLayout';
import ModalPortal from 'components/common/ModalPortal';

const MyBookInfo = lazy(() => import('@pages/MyBooksInfoPage'));
const MyBooks = lazy(() => import('@pages/MyBooksPage'));
const Kakao = lazy(() => import('@pages/KakaoPage'));
const KakaoRegister = lazy(() => import('@pages/KakaoRegisterPage'));
const Register = lazy(() => import('@pages/RegisterPage'));
const Login = lazy(() => import('@pages/LoginPage'));
const Search = lazy(() => import('@pages/SearchPage'));
const Comments = lazy(() => import('@pages/CommentsPage'));
const Profile = lazy(() => import('@pages/ProfilePage'));
const BottomSheet = lazy(() => import('components/common/BottomSheet'));
const CommentDetail = lazy(() => import('@pages/CommentDetailPage'));
const NotFound = lazy(() => import('@pages/404'));

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Router({ isLoading }: { isLoading: boolean }) {
  return (
    <BrowserRouter>
      <header>
        <Header isLoading={isLoading} />
      </header>
      <main>
        <section>
          <DefaultLayout>
            <Suspense
              fallback={
                <LoadingWrapper>
                  <Loader size={2} />
                </LoadingWrapper>
              }
            >
              <Routes>
                <Route path="/" Component={Home} />
                <Route element={<IsKakaoAuthLayout isKakaoRegister={true} />}>
                  <Route path="/register/kakao" Component={KakaoRegister} />
                </Route>
                <Route element={<IsKakaoAuthLayout isKakaoRegister={false} />}>
                  <Route path="/search" Component={Search} />
                  <Route path="/comments" Component={Comments} />
                  <Route
                    path="/comments/:comment_id"
                    Component={CommentDetail}
                  />
                  <Route element={<IsAuthLayout isAuth={true} />}>
                    <Route path="/profile" Component={Profile} />
                    <Route path="/my_books" Component={MyBooks} />
                    <Route
                      path="/my_books/:users_books_id"
                      Component={MyBookInfo}
                    />
                  </Route>
                  <Route element={<IsAuthLayout isAuth={false} />}>
                    <Route path="/login" Component={Login} />
                    <Route path="/login/kakao" Component={Kakao} />
                    <Route path="/register" Component={Register} />
                  </Route>
                </Route>
                <Route path="*" Component={NotFound} />
              </Routes>
            </Suspense>
          </DefaultLayout>
        </section>
      </main>
      <footer>
        <BottomNavigationBar />
      </footer>
      <ModalPortal>
        <Suspense
          fallback={
            <LoadingWrapper>
              <Loader />
            </LoadingWrapper>
          }
        >
          <BottomSheet />
        </Suspense>
      </ModalPortal>
    </BrowserRouter>
  );
}
