import { BrowserRouter, Routes, Route } from 'react-router-dom';

import DesktopLayout from './layout/DesktopLayout';
import Home from './Home';

export default function Router() {
  return (
    <BrowserRouter>
      <DesktopLayout>
        <Routes>
          <Route path="/" Component={Home} />
        </Routes>
      </DesktopLayout>
    </BrowserRouter>
  );
}
