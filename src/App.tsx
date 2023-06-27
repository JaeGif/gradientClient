import { Routes, Route, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import { AuthProvider } from './utils/AuthProvider';
import NavBar from './components/navbar/NavBar';
import RequireAuth from './components/protectRoutes/RequireAuth';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/home/Dashboard';
import Settings from './pages/home/Settings';
import Analytics from './pages/home/analytics/Analytics';
import Data from './pages/home/analytics/Data';
import Workouts from './pages/home/workouts/Workouts';
import NotFound from './pages/error/NotFound';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
type MemoStateObject = { [key: string]: any };

const ThemeContext = React.createContext<'light' | 'dark'>('dark');
const CacheContext = React.createContext<any>(null);
function App() {
  const [cache, setCache] = useState<MemoStateObject | undefined>();
  const handleSetCache = (data: MemoStateObject | undefined) => {
    setCache(data);
  };
  const cacheController = {
    state: cache,
    handleSetCache: handleSetCache,
  };
  return (
    <AuthProvider>
      <CacheContext.Provider value={cacheController}>
        <Routes>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route
            element={
              <div className='flex'>
                <NavBar />
                <RequireAuth />
              </div>
            }
          >
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='settings' element={<Settings />} />
            <Route path='workouts' element={<Workouts />}>
              <Route path='new' element={<>Something</>} />
            </Route>
            <Route path='analytics' element={<Analytics />}>
              <Route path=':data' element={<Data />} />
            </Route>
          </Route>
          <Route path='/' element={<Navigate to={'/dashboard'} />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
        <ReactQueryDevtools />
      </CacheContext.Provider>
    </AuthProvider>
  );
}

export { App, CacheContext };
