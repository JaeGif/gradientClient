import React, { useEffect, useState, memo } from 'react';
import { useAuth } from '../../utils/AuthProvider';
import { useUser } from '../../utils/UserProvider';

type SetProps = {
  i: number;
  index: number;
  handleSets: Function;
  set?: {
    reps?: number | undefined;
    weight?: number | undefined;
    unit: 'kg' | 'lb';
    logged: boolean;
  };
};
const Set = memo(({ index, i, handleSets, set }: SetProps) => {
  const userUnits = useUser()!.preferences.unit;
  const [weight, setWeight] = useState<number | undefined>(set?.weight);
  const [reps, setReps] = useState<number | undefined>(set?.reps);
  const [isLogged, setIsLogged] = useState(set?.logged);
  /*   useEffect(() => {
    if (set?.reps && set?.weight) {
      setIsLogged(true);
    }
  }, []); */
  return (
    <span className='mt-1 border-t-[1px] border-t-gray-100 flex pt-1'>
      <p className='p-2 text-center w-16 sm:w-24'>{i + 1}</p>
      <input
        onChange={(e) => setWeight(parseFloat(e.target.value))}
        className='sm:w-24 w-16 text-center outline-none'
        type='number'
        placeholder={`${userUnits}`}
        defaultValue={weight || undefined}
      />
      <input
        onChange={(e) => setReps(parseInt(e.target.value))}
        className='sm:w-24 w-16 text-center outline-none'
        type='number'
        placeholder={`reps`}
        defaultValue={reps || undefined}
      />
      <button
        onClick={() => {
          if (weight && reps && userUnits) {
            // i is the set index, index is the exercise index
            handleSets(index, i, {
              weight: weight,
              reps: reps,
              unit: userUnits,
              logged: true,
            });
          }
        }}
        className={
          isLogged
            ? 'bg-green-300 rounded-md sm:w-24 w-16 flex justify-center items-center'
            : 'bg-blue-20 rounded-md sm:w-24 w-16 flex justify-center items-center hover:bg-blue-10'
        }
      >
        {isLogged ? (
          <img className='h-6' src='/favicons/check.svg' alt='check' />
        ) : (
          'Log Set'
        )}
      </button>
    </span>
  );
});

export default Set;
