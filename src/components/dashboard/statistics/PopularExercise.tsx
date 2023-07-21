import React, { useState } from 'react';

function PopularExercise() {
  // exercise where you are the strongest
  const [isStrongest, setIsStrongest] = useState(true);
  return (
    <div className='relative shadow-md p-2 rounded-lg h-full flex w-1/4 flex-col justify-center items-center gap-2 text-center'>
      {isStrongest ? (
        <>
          <h2 className='text-xl'>Strongest</h2>
          <p className='text-3xl text-blue-500'>Bench Press</p>
          <p className=''>Intermediate</p>
        </>
      ) : (
        <>
          <h2 className='text-xl'>Weakest</h2>
          <p className='text-3xl text-blue-500'>Squat</p>
          <p>Beginner</p>
        </>
      )}
      <span className='absolute bottom-0 flex justify-end p-2 w-full'>
        <img
          alt='toggle'
          className='h-6 hover:cursor-pointer hover:animate-spin'
          src='/favicons/swap.svg'
          onClick={() => {
            setIsStrongest((prev) => !prev);
          }}
        />
      </span>
    </div>
  );
}

export default PopularExercise;
