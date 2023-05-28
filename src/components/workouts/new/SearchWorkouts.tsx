import React from 'react';
import SearchResult from './SearchResult';

function SearchWorkouts() {
  return (
    <div>
      <input
        className='border-2 border-gray-200 border-b-0 rounded-b-none rounded-md h-10 text-lg p-1 w-full'
        type='text'
        aria-label='search existing workouts'
        placeholder='Search existing workouts'
      />
      <div className='border-2 border-gray-200 rounded-b-md flex flex-wrap'>
        Results go here, mapped to a new element
      </div>
    </div>
  );
}

export default SearchWorkouts;
