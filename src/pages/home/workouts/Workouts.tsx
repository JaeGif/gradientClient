import React, { useState } from 'react';
import { Outlet, useOutlet } from 'react-router-dom';
import MyWorkouts from '../../../components/workouts/MyWorkouts';
import { WorkoutCardProps } from '../../../components/workouts/WorkoutCard';

function Workouts() {
  const outlet = useOutlet();
  const [workoutData, setWorkoutData] = useState<WorkoutCardProps | null>(null);
  return (
    <div className='flex flex-col p-4 w-full'>
      {outlet || null}
      <MyWorkouts />
    </div>
  );
}

export default Workouts;
