import React, {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { User } from '../types/Interfaces';
const apiURL = import.meta.env.VITE_LOCAL_API_URL;
const AuthContext = createContext<{
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  token: string | null;
} | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = (email: string, password: string) => {
    if (!email || !password) return;
    const loginUserWithCredentials = async () => {
      const data = {
        email: email,
        password: password,
      };
      const response = await fetch(`${apiURL}auth/local`, {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (result.data) {
        const userResult: User = {
          id: result.data.user.id,
          username: result.data.user.username,
          gender: result.data.user.gender,
          preferences: result.data.user.preferences,
          weight: result.data.user.weight,
          age: result.data.user.age,
        };
        setUser(userResult);
        setToken(result.data.token);
      }
    };
    loginUserWithCredentials();
  };
  const logout = () => {
    setUser(null);
  };

  // REMOVE THIS LATER, IT BELONGS IN THE LOGIN PAGE
  useEffect(() => {
    login('giffordjacob0@gmail.com', 'cat0both');
  }, []);
  return (
    <AuthContext.Provider value={{ user, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => {
  return useContext(AuthContext);
};
