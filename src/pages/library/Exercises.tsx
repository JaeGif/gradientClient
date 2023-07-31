import React from 'react';
import ExerciseLibrary from '../../components/exercises/previousExercises/ExerciseLibrary';
import ExerciseSearch from '../../components/exercises/exerciseSearch/ExerciseSearch';

function Exercises() {
  return (
    <div className='flex justify-center'>
      {/*       <ExerciseSearch />
       */}{' '}
      <ExerciseLibrary />
    </div>
  );
}

export default Exercises;
