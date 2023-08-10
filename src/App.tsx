import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import React, { useState } from 'react';
import { AuthProvider } from './utils/AuthProvider';
import NavBar from './components/navbar/NavBar';
import RequireAuth from './components/protectRoutes/RequireAuth';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/home/Dashboard';
import Analytics from './pages/home/analytics/Analytics';
import NotFound from './pages/error/NotFound';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import SelectedMuscleGroup from './pages/home/analytics/SelectedMuscleGroup';
import Record from './components/record/Record';
import Exercises from './pages/library/Exercises';
import UserProfile from './pages/profile/UserProfile';
import { UserProvider } from './utils/UserProvider';
import AnimateRoutes from './components/transtions/AnimateRoutes';
type MemoStateObject = { [key: string]: any };

const ThemeContext = React.createContext<'light' | 'dark'>('light');
const CacheContext = React.createContext<any>(null);

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [cache, setCache] = useState<MemoStateObject | undefined>({
    updateFlag: false,
  });
  const handleSetCache = (data: MemoStateObject | undefined) => {
    setCache(data);
  };
  const cacheController = {
    state: cache,
    handleSetCache: handleSetCache,
  };
  return (
    <div className={theme}>
      <AuthProvider>
        <CacheContext.Provider value={cacheController}>
          <UserProvider>
            <ThemeContext.Provider value={theme}>
              <AnimateRoutes setTheme={setTheme} />
            </ThemeContext.Provider>
          </UserProvider>
          {/*         <ReactQueryDevtools />
           */}{' '}
        </CacheContext.Provider>
      </AuthProvider>
    </div>
  );
}

export { App, CacheContext, ThemeContext };
