import React from 'react';
import { Link } from 'react-router-dom';
function Options() {
  return (
    <div className='flex justify-center items-center w-full'>
      <Link to={'/workouts/new'}>
        <button className='flex justify-center items-center gap-2 border-2 border-blue-500 p-2 rounded-md hover:bg-gray-200'>
          <img
            src='/favicons/dumbbell.png'
            alt='record workouts button icon'
            aria-label='record workouts button icon'
            className='h-8'
          />
          Record Workout
        </button>
      </Link>
    </div>
  );
}

export default Options;
