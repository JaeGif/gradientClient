import React from 'react';
import { Link } from 'react-router-dom';
function AnalyticsFilter() {
  return (
    <>
      <div className='flex justify-start items-center gap-2'>
        <span className='flex flex-wrap justify-center items-center'>
          <Link to={'muscleGroups/standards'}>
            <button className='dark:hover:bg-[rgb(60,60,60)] p-2 pl-4 pr-4 rounded-md hover:bg-blue-100'>
              Standards
            </button>
          </Link>
          <Link to={'muscleGroups/chest'}>
            <button className='dark:hover:bg-[rgb(60,60,60)] p-2 pl-4 pr-4 rounded-md hover:bg-blue-100'>
              Chest
            </button>
          </Link>
          <Link to={'muscleGroups/legs'}>
            <button className='dark:hover:bg-[rgb(60,60,60)] p-2 pl-4 pr-4 rounded-md hover:bg-blue-100'>
              Legs
            </button>
          </Link>
          <Link to={'muscleGroups/back'}>
            <button className='dark:hover:bg-[rgb(60,60,60)] p-2 pl-4 pr-4 rounded-md hover:bg-blue-100'>
              Back
            </button>
          </Link>
          <Link to={'muscleGroups/core'}>
            <button className='dark:hover:bg-[rgb(60,60,60)] p-2 pl-4 pr-4 rounded-md hover:bg-blue-100'>
              Core
            </button>
          </Link>
          <Link to={'muscleGroups/shoulders'}>
            <button className='dark:hover:bg-[rgb(60,60,60)] p-2 pl-4 pr-4 rounded-md hover:bg-blue-100'>
              Shoulders
            </button>
          </Link>
          <Link to={'muscleGroups/arms'}>
            <button className='dark:hover:bg-[rgb(60,60,60)] p-2 pl-4 pr-4 rounded-md hover:bg-blue-100'>
              Arms
            </button>
          </Link>
          <Link to={'muscleGroups/all'}>
            <button className='dark:hover:bg-[rgb(60,60,60)] p-2 pl-4 pr-4 rounded-md hover:bg-blue-100'>
              All
            </button>
          </Link>
        </span>
      </div>
    </>
  );
}

export default AnalyticsFilter;
