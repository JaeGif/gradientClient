import React, { useState } from 'react';
import RecordExercise from './RecordExercise';
import uniqid from 'uniqid';
function Record() {
  const [exerciseCount, setExerciseCount] = useState([0]);
  const [exercisesData, setExercisesData] = useState();

  return (
    <div className='debug flex flex-col w-full h-full p-6'>
      <span className='flex justify-center items-center w-full flex-wrap'>
        <h3>Record Exercise</h3>
      </span>
      <span></span>
      {exerciseCount.map((count) => (
        <RecordExercise key={uniqid()} />
      ))}
    </div>
  );
}

export default Record;
