import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AdminAuthContextProps {
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextProps | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    localStorage.getItem('isAdmin') === 'true'
  );

  const login = async (username: string, password: string) => {
    try {
      // Chiamata fittizia, sostituisci con la tua API
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error('Credenziali non valide');
      }
      localStorage.setItem('isAdmin', 'true');
      setIsLoggedIn(true);
      navigate('/');
    } catch (err) {
      alert('Login fallito');
    }
  };

  const logout = () => {
    localStorage.removeItem('isAdmin');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <AdminAuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    throw new Error('useAdminAuth deve essere usato dentro AdminAuthProvider');
  }
  return ctx;
};
