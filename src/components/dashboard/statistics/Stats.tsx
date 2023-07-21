import React from 'react';
import AvgDaysPerWeek from './AvgDaysPerWeek';
import UserWeight from './UserWeight';
import PopularExercise from './PopularExercise';

function Stats() {
  return (
    <div className='flex justify-evenly items-center w-full h-36'>
      <AvgDaysPerWeek />
      <UserWeight />
      <PopularExercise />
    </div>
  );
}

export default Stats;
