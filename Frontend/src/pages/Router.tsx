import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import styled from 'styled-components';

import Header from 'components/header/Header';
import Loader from 'components/common/Loader';
import BottomNavigationBar from 'components/bottom/BottomNavigationBar';
import ModalPortal from 'components/common/ModalPortal';
import DefaultLayout from '@pages/layout/DefaultLayout';
import IsAuthLayout from '@pages/layout/IsAuthLayout';
import IsKakaoAuthLayout from '@pages/layout/IsKakaoAuthLayout';

import HomePage from '@pages/HomePage';

const MyBooksPage = lazy(() => import('@pages/MyBooksPage'));
const MyBookInfoPage = lazy(() => import('@pages/MyBooksInfoPage'));
const KakaoPage = lazy(() => import('@pages/KakaoPage'));
const KakaoRegisterPage = lazy(() => import('@pages/KakaoRegisterPage'));
const RegisterPage = lazy(() => import('@pages/RegisterPage'));
const LoginPage = lazy(() => import('@pages/LoginPage'));
const SearchPage = lazy(() => import('@pages/SearchPage'));
const CommentsPage = lazy(() => import('@pages/CommentsPage'));
const ProfilePage = lazy(() => import('@pages/ProfilePage'));
const CommentDetailPage = lazy(() => import('@pages/CommentDetailPage'));
const NotFound = lazy(() => import('@pages/404'));
const BottomSheet = lazy(() => import('components/common/BottomSheet'));

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Router() {
  return (
    <BrowserRouter>
      <header>
        <Header />
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
                <Route path="/" Component={HomePage} />
                <Route element={<IsKakaoAuthLayout needKakaoRegister={true} />}>
                  <Route path="/register/kakao" Component={KakaoRegisterPage} />
                </Route>
                <Route
                  element={<IsKakaoAuthLayout needKakaoRegister={false} />}
                >
                  <Route path="/search" Component={SearchPage} />
                  <Route path="/comments" Component={CommentsPage} />
                  <Route
                    path="/comments/:comment_id"
                    Component={CommentDetailPage}
                  />
                  <Route element={<IsAuthLayout needLogin={true} />}>
                    <Route path="/profile" Component={ProfilePage} />
                    <Route path="/my_books" Component={MyBooksPage} />
                    <Route
                      path="/my_books/:users_books_id"
                      Component={MyBookInfoPage}
                    />
                  </Route>
                  <Route element={<IsAuthLayout needLogin={false} />}>
                    <Route path="/login" Component={LoginPage} />
                    <Route path="/login/kakao" Component={KakaoPage} />
                    <Route path="/register" Component={RegisterPage} />
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
