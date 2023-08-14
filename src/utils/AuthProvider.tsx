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
  login: (email: string, password: string) => false | Promise<boolean>;
  logout: () => void;
  token: string | null;
} | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const persistLoginLocalStorage = (userRes: User, tokenRes: string) => {
    const loginLocalObject = {
      user: userRes,
      token: tokenRes,
    };

    localStorage.setItem(
      'gradientLoggedInUser',
      JSON.stringify(loginLocalObject)
    );
  };
  const retrieveLoginLocalStorage = () => {
    const storage = localStorage.getItem('gradientLoggedInUser');
    if (!storage) return;
    const storageData = JSON.parse(storage);
    if (storageData.token && storageData.user && storageData.user.id) {
      setUser(storageData.user);
      setToken(storageData.token);
    } else {
      localStorage.clear();
      return;
    }
  };
  const login = (email: string, password: string) => {
    if (!email || !password) return false;

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
      if (result.data && result.data.user.id) {
        let userResult: User = {
          id: result.data.user.id,
          username: result.data.user.username,
          gender: result.data.user.gender,
          preferences: result.data.user.preferences,
          weight: result.data.user.weight,
          bodyFatPercentage: result.data.user.bodyFatPercentage,
          age: result.data.user.age,
        };
        setUser(userResult);
        setToken(result.data.token);
        persistLoginLocalStorage(userResult, result.data.token);
        return true;
      } else return false;
    };
    return loginUserWithCredentials();
  };
  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    if (!user && !token) retrieveLoginLocalStorage();
    if (user && user.id && token) {
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
