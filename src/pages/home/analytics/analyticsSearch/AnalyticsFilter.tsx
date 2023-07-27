import React from 'react';
import { Link } from 'react-router-dom';
function AnalyticsFilter() {
  return (
    <div className='flex justify-start items-center'>
      <h2>Exercise Filters</h2>
      <span className='flex justify-center items-center'>
        <Link to={'muscleGroups/standards'}>
          <button className='p-2'>Standards</button>
        </Link>
        <Link to={'muscleGroups/chest'}>
          <button className='p-2'>Chest</button>
        </Link>
        <Link to={'muscleGroups/legs'}>
          <button className='p-2'>Legs</button>
        </Link>
        <Link to={'muscleGroups/back'}>
          <button className='p-2'>Back</button>
        </Link>
        <Link to={'muscleGroups/core'}>
          <button className='p-2'>Core</button>
        </Link>
        <Link to={'muscleGroups/shoulders'}>
          <button className='p-2'>Shoulders</button>
        </Link>
        <Link to={'muscleGroups/all'}>
          <button className='p-2'>All</button>
        </Link>
      </span>
    </div>
  );
}

export default AnalyticsFilter;
