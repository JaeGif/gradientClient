import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import React, { useState } from 'react';
import { AuthProvider } from './utils/AuthProvider';
import NavBar from './components/navbar/NavBar';
import RequireAuth from './components/protectRoutes/RequireAuth';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/home/Dashboard';
import Settings from './pages/home/Settings';
import Analytics from './pages/home/analytics/Analytics';
import Workouts from './pages/home/workouts/Workouts';
import NotFound from './pages/error/NotFound';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import SelectedMuscleGroup from './pages/home/analytics/SelectedMuscleGroup';
type MemoStateObject = { [key: string]: any };

const ThemeContext = React.createContext<'light' | 'dark'>('dark');
const CacheContext = React.createContext<any>(null);
function App() {
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
    <AuthProvider>
      <CacheContext.Provider value={cacheController}>
        <Routes>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route
            element={
              <div className='flex justify-center gap-5'>
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
              <Route
                path='muscleGroups'
                element={
                  <>
                    {location.pathname === '/analytics/muscleGroups' ? (
                      <Navigate to={'all'} />
                    ) : (
                      <Outlet />
                    )}
                  </>
                }
              >
                <Route path=':muscleGroup' element={<SelectedMuscleGroup />} />
              </Route>
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
