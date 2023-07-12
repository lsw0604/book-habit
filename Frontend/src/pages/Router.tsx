import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/header/Header';

import DesktopLayout from './layout/DesktopLayout';
import Home from './Home';

export default function Router() {
  return (
    <BrowserRouter>
      <Header></Header>
      <DesktopLayout>
        <Routes>
          <Route path="/" Component={Home} />
        </Routes>
      </DesktopLayout>
    </BrowserRouter>
  );
}
