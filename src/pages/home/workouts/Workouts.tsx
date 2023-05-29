import React, { useState } from 'react';
import { Outlet, useOutlet } from 'react-router-dom';
import MyWorkouts from '../../../components/workouts/MyWorkouts';
import RecordWorkoutModal from '../../../components/workouts/RecordWorkoutModal';
import { WorkoutCardProps } from '../../../components/workouts/WorkoutCard';

function Workouts() {
  const outlet = useOutlet();
  const [toggleRecordModal, setToggleRecordModal] = useState(false);
  const [workoutData, setWorkoutData] = useState<WorkoutCardProps | null>(null);
  const openModalWithData = () => {};
  return (
    <div className='flex flex-col p-4 w-full'>
      {outlet || null}
      <MyWorkouts />
      {toggleRecordModal && <RecordWorkoutModal />}
    </div>
  );
}

export default Workouts;
