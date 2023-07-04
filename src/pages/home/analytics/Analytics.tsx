import React from 'react';
import { Outlet } from 'react-router-dom';

import AvgAbs1RepMaxToggle from '../../../components/analytics/AvgAbs1RepMaxToggle';

//
function Analytics() {
  return (
    <div className='flex flex-col w-full max-h-screen overflow-x-scroll'>
      <AvgAbs1RepMaxToggle exerciseId='bf61dcb9-7147-4bdd-af5e-c987f2c2439a' />
      <AvgAbs1RepMaxToggle exerciseId='6a10f694-25bd-4824-b2a2-bfb21b4167c4' />
      <Outlet />
    </div>
  );
}

export default Analytics;
