import React from 'react';
import { Route, Routes, Navigate, Outlet, useLocation } from 'react-router-dom';
import NavBar from '../navbar/NavBar';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import RequireAuth from '../protectRoutes/RequireAuth';
import Dashboard from '../../pages/home/Dashboard';
import UserProfile from '../../pages/profile/UserProfile';
import Exercises from '../../pages/library/Exercises';
import Record from '../record/Record';
import Analytics from '../../pages/home/analytics/Analytics';
import SelectedMuscleGroup from '../../pages/home/analytics/SelectedMuscleGroup';
import NotFound from '../../pages/error/NotFound';

type AnimateRoutesProps = {
  setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
};
function AnimateRoutes({ setTheme }: AnimateRoutesProps) {
  const location = useLocation();
  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route
        element={
          <div className='flex justify-center gap-5'>
            <NavBar setTheme={setTheme} />
            <RequireAuth />
          </div>
        }
      >
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='settings' element={<UserProfile />} />
        <Route path='exercises' element={<Exercises />} />
        <Route path='record' element={<Record />} />
        <Route
          path='analytics/*'
          element={
            <>
              <Analytics />
            </>
          }
        >
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
  );
}

export default AnimateRoutes;
