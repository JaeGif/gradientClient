import React from 'react';
import UserBodyFat from './UserBodyFat';
import UserWeight from './UserWeight';
import PopularExercise from './PopularExercise';

function Stats() {
  return (
    <div className='flex justify-evenly items-center w-full h-36'>
      <UserBodyFat />
      <UserWeight />
      <PopularExercise />
    </div>
  );
}

export default Stats;
