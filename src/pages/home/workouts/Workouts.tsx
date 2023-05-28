import React from 'react';
import { Outlet } from 'react-router-dom';

function Workouts() {
  return (
    <div className='flex flex-col p-4 w-full'>
      <Outlet />
      <div>Workouts Page</div>
    </div>
  );
}

export default Workouts;
