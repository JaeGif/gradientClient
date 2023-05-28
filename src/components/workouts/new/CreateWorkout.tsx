import React, { useState } from 'react';
import SearchWorkouts from './SearchWorkouts';
import Instructions from './Instructions';
import AddExercise from './AddExercise';
import SearchExercise from './SearchExercise';
function CreateWorkout() {
  const [exercises, setExercises] = useState([]);
  const [exerciseSearchToggle, setExerciseSearchToggle] = useState(false);
  const clickAddExercise = () => {
    setExerciseSearchToggle(true);
  };

  return (
    <div className='flex flex-col items-center debug w-full'>
      <Instructions />
      <span className='debug flex flex-col justify-center'>
        <SearchWorkouts />
        {/* map exercises based on workout selected */}
        {exerciseSearchToggle ? (
          <SearchExercise />
        ) : (
          <AddExercise clickAddExercise={clickAddExercise} />
        )}
      </span>
    </div>
  );
}

export default CreateWorkout;
