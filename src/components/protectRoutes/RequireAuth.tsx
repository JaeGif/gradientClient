import React, { ReactNode } from 'react';
import { useAuth } from '../../utils/AuthProvider';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function RequireAuth() {
  const auth = useAuth();
  const location = useLocation();
  if (!auth!.user) {
    return <Navigate to='/login' state={{ path: location.pathname }} replace />;
  } else {
    return <Outlet />;
  }
}

export default RequireAuth;
