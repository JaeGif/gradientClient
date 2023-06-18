import React from 'react';
import { Outlet } from 'react-router-dom';
import ExerciseCurrentLevel from '../../../components/analytics/ExerciseCurrentLevel';
import ExerciseOneRepMax from '../../../components/analytics/ExerciseOneRepMax';

function Analytics() {
  return (
    <div className='flex flex-col w-full h-full debug'>
      <div>Analytics</div>
      <ExerciseCurrentLevel exerciseId='ebe49d2f-4892-4370-b8a5-936e0dfb70be' />
      <ExerciseOneRepMax exerciseId='ebe49d2f-4892-4370-b8a5-936e0dfb70be' />
      <Outlet />
    </div>
  );
}

export default Analytics;
