import React from 'react';
import ExerciseLibrary from '../../components/exercises/previousExercises/ExerciseLibrary';
import ExerciseSearch from '../../components/exercises/exerciseSearch/ExerciseSearch';

function Exercises() {
  return (
    <div className='flex flex-col w-full gap-2 p-2'>
      <span className='flex flex-col p-2 pl-4 shadow-md rounded-md'>
        <h1>Exercise Library</h1>
        <p className='text-slate-400'>View or edit your exercise history</p>
      </span>
      <div className='flex gap-5'>
        <ExerciseSearch />
        <ExerciseLibrary />
      </div>
    </div>
  );
}

export default Exercises;
