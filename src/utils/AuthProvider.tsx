import React, {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { User } from '../types/Interfaces';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const location = useLocation();

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
        console.log(result);
        setUser(userResult);
        setToken(result.data.token);
      }
    };
    loginUserWithCredentials();
  };
  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    if (user && token) {
      const redirectPath = location.state?.path || '/dashboard';
      navigate(redirectPath);
    }
  }, [user, token]);

  return (
    <AuthContext.Provider value={{ user, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => {
  return useContext(AuthContext);
};
