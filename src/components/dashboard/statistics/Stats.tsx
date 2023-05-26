import React from 'react';
import AvgDaysPerWeek from './AvgDaysPerWeek';
import SetsPerMuscleGroupWeek from './SetsPerMuscleGroupWeek';
import PopularExercise from './PopularExercise';

function Stats() {
  return (
    <div className='flex justify-evenly items-center w-full h-36'>
      <AvgDaysPerWeek />
      <SetsPerMuscleGroupWeek />
      <PopularExercise />
    </div>
  );
}

export default Stats;
