import { useAuth } from '../../utils/AuthProvider';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function RequireAuth() {
  const auth = useAuth();
  const location = useLocation();

  if (!auth!.user) {
    return <Navigate to='/login' state={{ path: location.pathname }} replace />;
  } else {
    return (
      <div className='mb-10 sm:mb-0'>
        <Outlet />
      </div>
    );
  }
}

export default RequireAuth;
