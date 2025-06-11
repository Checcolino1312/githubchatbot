import { useState } from 'react';
import { loginAdmin } from '../services/loginApi';

export const useAdminAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (username: string, password: string) => {
    try {
      const result = await loginAdmin(username, password);
      console.log('✅ Login riuscito:', result);
      setIsLoggedIn(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('❌ Login fallito:', error.message);
        alert(error.message);
      }
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    // Se usi localStorage o token: localStorage.removeItem('token')
  };

  return { login, logout, isLoggedIn };
};
