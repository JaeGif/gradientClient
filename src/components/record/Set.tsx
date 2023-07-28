import React, { useState } from 'react';
import { useAuth } from '../../utils/AuthProvider';

type SetProps = {
  i: number;
  logSet: Function;
};
function Set({ i, logSet }: SetProps) {
  const userUnits = useAuth()!.user!.preferences.unit;
  const [weight, setWeight] = useState<number>();
  const [reps, setReps] = useState<number>();
  const [isLogged, setIsLogged] = useState(false);
  return (
    <span className='mt-1 border-t-[1px] border-t-gray-100 flex pt-1'>
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
      <button
        onClick={() => {
          if (weight && reps && userUnits) {
            setIsLogged(true);
            logSet({ weight: weight, reps: reps, units: userUnits });
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
