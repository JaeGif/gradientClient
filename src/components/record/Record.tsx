import React, { useState } from 'react';
import RecordExercise from './RecordExercise';
import uniqid from 'uniqid';
function Record() {
  const [exerciseCount, setExerciseCount] = useState([0]);
  const [exercisesData, setExercisesData] = useState();

  return (
    <div className='flex flex-col w-full h-full p-6 gap-2'>
      <span className='flex justify-center items-center w-full flex-wrap'>
        <h3>Record Exercise</h3>
      </span>
      <span
        onClick={() => {
          setExerciseCount((prev) => [...prev, 0]);
        }}
        className='border-2 border-slate-300 rounded-md p-2 w-fit flex justify-center items-center gap-2 hover:cursor-pointer hover:bg-slate-300'
      >
        <h6>Add New Exercise</h6>
        <img
          className='h-8'
          src='/favicons/new.svg'
          alt='new exercise button'
        />
      </span>
      <div className='flex flex-col gap-2 justify-center items-center'>
        {exerciseCount.map((count) => (
          <RecordExercise key={uniqid()} />
        ))}
      </div>
    </div>
  );
}

export default Record;
