/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import Login from './pages/Login';
import About from './pages/About';
import Manifesto from './pages/Manifesto';
import News from './pages/News';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="about" element={<About />} />
          <Route path="manifesto" element={<Manifesto />} />
          <Route path="news" element={<News />} />
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

