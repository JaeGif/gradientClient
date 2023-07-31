import React, { useState } from 'react';
import Set from './Set';
import uniqid from 'uniqid';

type SetPerformedProps = {
  setsData: {
    reps?: number | undefined;
    weight?: number | undefined;
    unit: 'kg' | 'lb';
  }[];
  handleSets: Function;
  index: number;
};
function SetPerformed({ handleSets, setsData, index }: SetPerformedProps) {
  return (
    <div className='flex flex-col'>
      <span className='flex justify-start items-center'>
        <p className='w-24 text-center'>SET</p>
        <p className='w-24 text-center'>WEIGHT</p>
        <p className='w-24 text-center'>REPS</p>
        <p className='invisible w-24'>Placeholder</p>
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
