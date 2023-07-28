import React, { useState } from 'react';
import Set from './Set';
import uniqid from 'uniqid';

type SetPerformedProps = {
  setCount: number[];
  logSet: Function;
};
function SetPerformed({ setCount, logSet }: SetPerformedProps) {
  return (
    <div className='flex flex-col'>
      <span className='flex justify-start items-center'>
        <p className='w-24 text-center'>SET</p>
        <p className='w-24 text-center'>WEIGHT</p>
        <p className='w-24 text-center'>REPS</p>
        <p className='invisible w-24'>Placeholder</p>
      </span>
      {setCount.map((set, i) => (
        <Set logSet={logSet} key={uniqid()} i={i} />
      ))}
    </div>
  );
}

export default SetPerformed;
