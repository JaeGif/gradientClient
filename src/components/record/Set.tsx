import React, { useState } from 'react';
import { useAuth } from '../../utils/AuthProvider';

type SetProps = {
  i: number;
};
function Set({ i }: SetProps) {
  const userUnits = useAuth()!.user!.preferences.unit;
  const [weight, setWeight] = useState<number>();
  const [reps, setReps] = useState<number>();

  return (
    <span className='mt-1 border-t-[1px] border-t-gray-100 flex'>
      <p className='p-2 text-center w-24'>{i + 1}</p>
      <input
        onChange={(e) => setWeight(parseFloat(e.target.value))}
        className='w-24 text-center outline-none'
        type='number'
        placeholder={`${userUnits}`}
      />
      <input
        onChange={(e) => setReps(parseInt(e.target.value))}
        className='w-24 text-center outline-none'
        type='number'
        placeholder={`reps`}
      />
    </span>
  );
}

export default Set;
