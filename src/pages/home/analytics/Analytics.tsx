import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import AvgAbs1RepMaxToggle from '../../../components/analytics/AvgAbs1RepMaxToggle';
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
    <div className='gap-2 flex flex-col w-full max-h-screen overflow-x-scroll p-2'>
      <div className='shadow-md p-2 rounded-md'>
        <AnalyticsTitle />
        <AnalyticsFilter />
      </div>
      <Outlet />
    </div>
  );
}

export default Analytics;
