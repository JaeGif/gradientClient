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
        <UserProvider>
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
              <Route path='settings' element={<UserProfile />} />
              <Route path='exercises' element={<Exercises />} />
              <Route path='record' element={<Record />} />
              <Route path='analytics/*' element={<Analytics />}>
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
                  <Route
                    path=':muscleGroup'
                    element={<SelectedMuscleGroup />}
                  />
                </Route>
              </Route>
            </Route>
            <Route path='/' element={<Navigate to={'/dashboard'} />} />
            <Route path='/*' element={<NotFound />} />
          </Routes>
        </UserProvider>

        <ReactQueryDevtools />
      </CacheContext.Provider>
    </AuthProvider>
  );
}

export { App, CacheContext };
