import { useAuth } from '../../utils/AuthProvider';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function RequireAuth() {
  const auth = useAuth();
  const location = useLocation();

  if (!auth!.user) {
    return <Navigate to='/login' state={{ path: location.pathname }} replace />;
  } else {
    return (
      <div className='mb-14 lg:mb-0 dark:bg-[rgb(20,20,20)] w-full min-h-[calc(100vh-6rem)] lg:min-h-screen h-full lg:ml-[22vw]'>
        <Outlet />
      </div>
    );
  }
}

export default RequireAuth;
