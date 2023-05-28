import React from 'react';

type AddExerciseProps = {
  clickAddExercise: Function;
};
function AddExercise({ clickAddExercise }: AddExerciseProps) {
  return (
    <button
      onClick={() => {
        clickAddExercise();
      }}
      className='w-fit p-2 border-2 border-blue-400 rounded-md'
    >
      New exercise
    </button>
  );
}

export default AddExercise;
