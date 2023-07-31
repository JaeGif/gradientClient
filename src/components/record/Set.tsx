import React, { useState } from 'react';
import { useAuth } from '../../utils/AuthProvider';

type SetProps = {
  i: number;
  index: number;
  handleSets: Function;
  set?: {
    reps?: number | undefined;
    weight?: number | undefined;
    unit: 'kg' | 'lb';
  };
};
function Set({ index, i, handleSets, set }: SetProps) {
  console.log('weight', set?.weight, 'reps', set?.reps);
  const userUnits = useAuth()!.user!.preferences.unit;
  const [weight, setWeight] = useState<number | undefined>(set?.weight);
  const [reps, setReps] = useState<number | undefined>(set?.reps);
  const [isLogged, setIsLogged] = useState(false);
  return (
    <span className='mt-1 border-t-[1px] border-t-gray-100 flex pt-1'>
      <p className='p-2 text-center w-24'>{i + 1}</p>
      <input
        onChange={(e) => setWeight(parseFloat(e.target.value))}
        className='w-24 text-center outline-none'
        type='number'
        placeholder={`${userUnits}`}
        defaultValue={weight || undefined}
      />
      <input
        onChange={(e) => setReps(parseInt(e.target.value))}
        className='w-24 text-center outline-none'
        type='number'
        placeholder={`reps`}
        defaultValue={reps || undefined}
      />
      <button
        onClick={() => {
          if (weight && reps && userUnits) {
            setIsLogged(true);
            // i is the set index, index is the exercise index
            handleSets(index, i, {
              weight: weight,
              reps: reps,
              unit: userUnits,
            });
          }
        }}
        className='bg-blue-20 rounded-md w-24'
      >
        {isLogged ? (
          <img className='h-4' src='/favicons/check.svg' alt='check' />
        ) : (
          'Log Set'
        )}
      </button>
    </span>
  );
}

export default Set;
