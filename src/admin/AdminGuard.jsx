import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import { isSessionActive } from './auth/cryptoService';

export function AdminGuard({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const authStatus = sessionStorage.getItem('seif_admin_authenticated') === 'true';
    const active = isSessionActive ? isSessionActive() : authStatus;
    setIsAuthenticated(authStatus && active);
  }, [location.pathname]);

  if (isAuthenticated === null) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc', color: '#64748b' }}>
        جاري التحقق من أمان الجلسة...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return children;
}

export default AdminGuard;
