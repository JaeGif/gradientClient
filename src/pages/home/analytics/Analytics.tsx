import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import AnalyticsFilter from './analyticsSearch/AnalyticsFilter';
import AnalyticsTitle from './AnalyticsTitle';

//
function Analytics() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === '/analytics')
      navigate('/analytics/muscleGroups/standards');
  }, [location.pathname]);

  return (
    <>
      <div className='gap-2 flex flex-col w-screen lg:w-[calc(100vw-20rem)] sm:p-2'>
        <div className='max-w-screen shadow-md p-2 sm:pl-4 rounded-md'>
          <AnalyticsTitle />
          <AnalyticsFilter />
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default Analytics;
