import React, { ReactNode } from 'react';
import { useAuth } from '../../utils/AuthProvider';
import { Navigate, Outlet } from 'react-router-dom';

function RequireAuth() {
  const auth = useAuth();
  if (!auth!.user) {
    return <Navigate to='/login' />;
  } else {
    return <Outlet />;
  }
}

export default RequireAuth;
