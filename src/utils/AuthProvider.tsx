import React, { useState, createContext, ReactNode } from 'react';
import { User } from '../types/Interfaces';
const AuthContext = createContext<{
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
} | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (user: User) => {
    setUser(user);
  };
  const logout = () => {
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
