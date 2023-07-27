import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import AvgAbs1RepMaxToggle from '../../../components/analytics/AvgAbs1RepMaxToggle';
import AnalyticsFilter from './analyticsSearch/AnalyticsFilter';
import AnalyticsTitle from './AnalyticsTitle';

//
function Analytics() {
  return (
    <div className='flex flex-col w-full max-h-screen overflow-x-scroll p-2'>
      <AnalyticsTitle />
      <AnalyticsFilter />
      {/*       <AvgAbs1RepMaxToggle exerciseId='bf61dcb9-7147-4bdd-af5e-c987f2c2439a' />
      <AvgAbs1RepMaxToggle exerciseId='4c08bff3-33d6-4ff2-9252-97ab9164349d' />
      <AvgAbs1RepMaxToggle exerciseId='5850e575-4f8d-4723-bb1f-6807fbab1458' />
      <AvgAbs1RepMaxToggle exerciseId='a00e222e-b2b4-4447-9274-7b9c011af8b5' />
      <AvgAbs1RepMaxToggle exerciseId='6a10f694-25bd-4824-b2a2-bfb21b4167c4' /> */}
      <Outlet />
    </div>
  );
}

export default Analytics;
