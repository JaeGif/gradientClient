import React from 'react';
import { Outlet } from 'react-router-dom';
import ExerciseCurrentLevel from '../../../components/analytics/ExerciseCurrentLevel';

function Analytics() {
  return (
    <>
      <div>Analytics</div>
      <ExerciseCurrentLevel exerciseId='ebe49d2f-4892-4370-b8a5-936e0dfb70be' />
      <ExerciseCurrentLevel exerciseId='bf61dcb9-7147-4bdd-af5e-c987f2c2439a' />
      <Outlet />
    </>
  );
}

export default Analytics;
