import React from 'react';

function PopularExercise() {
  // exercise where you are the strongest
  return (
    <div className='debug p-2 rounded-lg h-full flex w-1/4 flex-col justify-center items-center gap-2'>
      <h2 className='text-xl'>Strongest</h2>
      <p className='text-3xl text-blue-500'>Bench Press</p>
      <p>Intermediate</p>
    </div>
  );
}

export default PopularExercise;
