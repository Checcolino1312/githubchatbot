import { createContext } from 'react';

export interface AdminAuthContextProps {
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AdminAuthContext = createContext<AdminAuthContextProps | undefined>(undefined);
