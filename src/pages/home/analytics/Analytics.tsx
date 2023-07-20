import React from 'react';
import { Outlet } from 'react-router-dom';

import AvgAbs1RepMaxToggle from '../../../components/analytics/AvgAbs1RepMaxToggle';

//
function Analytics() {
  return (
    <div className='flex flex-col w-full max-h-screen overflow-x-scroll'>
      <AvgAbs1RepMaxToggle exerciseId='bf61dcb9-7147-4bdd-af5e-c987f2c2439a' />
      <Outlet />
    </div>
  );
}

export default Analytics;
