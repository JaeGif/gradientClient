import React, { useState } from 'react';
import Set from './Set';
import uniqid from 'uniqid';

type SetPerformedProps = {
  setCount: number[];
};
function SetPerformed({ setCount }: SetPerformedProps) {
  return (
    <div className='flex flex-col'>
      <span className='flex justify-start items-center'>
        <p className='w-24 text-center'>SET</p>
        <p className='w-24 text-center'>WEIGHT</p>
        <p className='w-24 text-center'>REPS</p>
      </span>
      {setCount.map((set, i) => (
        <Set key={uniqid()} i={i} />
      ))}
    </div>
  );
}

export default SetPerformed;
