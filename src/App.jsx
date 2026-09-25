import './admin/admin.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Projects from './pages/Projects';
import Presentations from './pages/Presentations';
import Teaching from './pages/Teaching';
import Credentials from './pages/Credentials';
import Testimonials from './pages/Testimonials';
import About from './pages/About';
import Contact from './pages/Contact';

// 🛡️ Secret Admin CMS Imports
import { DynamicPortfolioProvider } from './context/DynamicPortfolioContext';
import { SecretKeyShortcutListener, SECRET_ADMIN_ROUTE } from './admin/components/SecretKeyShortcutListener';
import { AdminGuard } from './admin/AdminGuard';
import { AdminDashboard } from './admin/AdminDashboard';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function MainLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname === SECRET_ADMIN_ROUTE;

  if (isAdminRoute) {
    return (
      <Routes>
        <Route
          path={SECRET_ADMIN_ROUTE}
          element={
            <AdminGuard>
              <AdminDashboard />
            </AdminGuard>
          }
        />
      </Routes>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', backgroundColor: 'var(--bg-canvas)' }}>
      <Navbar />
      <main style={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/credentials" element={<Credentials />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/teaching" element={<Teaching />} />
          <Route path="/presentations" element={<Presentations />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <DynamicPortfolioProvider>
      <Router>
        <ScrollToTop />
        <SecretKeyShortcutListener />
        <MainLayout />
      </Router>
    </DynamicPortfolioProvider>
  );
}
