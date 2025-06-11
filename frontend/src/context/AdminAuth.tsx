import React, { useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminAuthContext } from './AdminAuthContext'; // aggiorna il path se necessario

interface Props {
  children: ReactNode;
}

export const AdminAuthProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    localStorage.getItem('isAdmin') === 'true'
  );

  const login = async (username: string, password: string) => {
    try {
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
    } catch {
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
