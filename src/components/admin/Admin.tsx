import React, { useState } from 'react';
import { AdminLogin } from './Login';
import { AdminDashboard } from './Dashboard';
import { authService } from '../../services/auth';

export function Admin() {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  if (!user) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return <AdminDashboard user={user} onLogout={handleLogout} />;
}