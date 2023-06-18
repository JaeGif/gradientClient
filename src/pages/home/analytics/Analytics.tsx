import React from 'react';
import { Outlet } from 'react-router-dom';
import ExerciseCurrentLevel from '../../../components/analytics/ExerciseCurrentLevel';
import ExerciseOneRepMax from '../../../components/analytics/ExerciseOneRepMax';

function Analytics() {
  return (
    <div className='flex flex-col w-full h-full debug'>
      <div>Analytics</div>
      <ExerciseCurrentLevel exerciseId='bf61dcb9-7147-4bdd-af5e-c987f2c2439a' />
      <ExerciseOneRepMax exerciseId='bf61dcb9-7147-4bdd-af5e-c987f2c2439a' />
      <Outlet />
    </div>
  );
}

export default Analytics;
