import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/header/Header';

import DesktopLayout from './layout/DesktopLayout';
import Home from './Home';

export default function Router({ onToggle }: { onToggle: () => void }) {
  return (
    <BrowserRouter>
      <Header onToggle={onToggle} />
      <DesktopLayout>
        <Routes>
          <Route path="/" Component={Home} />
        </Routes>
      </DesktopLayout>
    </BrowserRouter>
  );
}
