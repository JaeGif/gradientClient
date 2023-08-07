import React, { useState } from 'react';
import Set from './Set';
import uniqid from 'uniqid';

type SetPerformedProps = {
  setsData: {
    reps?: number | undefined;
    weight?: number | undefined;
    unit: 'kg' | 'lb';
    logged: boolean;
  }[];
  handleSets: Function;
  index: number;
};
function SetPerformed({ handleSets, setsData, index }: SetPerformedProps) {
  return (
    <div className='flex flex-col'>
      <span className='flex flex-wrap justify-start items-center'>
        <p className='sm:w-24 w-16 text-center'>SET</p>
        <p className='sm:w-24 w-16 text-center'>WEIGHT</p>
        <p className='sm:w-24 w-16 text-center'>REPS</p>
        <p className='invisible sm:w-24 w-16 '>Placeholder</p>
      </span>
      {setsData.map((set, i) => (
        <Set
          handleSets={handleSets}
          key={uniqid()}
          i={i}
          index={index}
          set={set}
        />
      ))}
    </div>
  );
}

export default SetPerformed;
