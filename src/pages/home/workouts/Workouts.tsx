import React from 'react';
import { Outlet } from 'react-router-dom';
import MyWorkouts from '../../../components/workouts/MyWorkouts';

function Workouts() {
  return (
    <div className='flex flex-col p-4 w-full'>
      <Outlet />
      <MyWorkouts />
    </div>
  );
}

export default Workouts;
