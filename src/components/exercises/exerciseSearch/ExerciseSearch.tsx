import React, { useState, useEffect } from 'react';
import { capitalize } from '../../../utils/fnSheet/utilities';
import uniqid from 'uniqid';
import { useAuth } from '../../../utils/AuthProvider';
import useMatchingExerciseSearch from '../../../hooks/useMatchingExerciseSearch';
function ExerciseSearch() {
  const [s, setS] = useState<string>();
  const [matchedExercises, setMatchedExercises] = useState<
    {
      id: string;
      muscleGroupsId: string;
      name: string;
      reps?: number;
      sets?: number;
      standardized: boolean;
    }[]
  >();
  const userId = useAuth()!.user!.id;
  const matchingExercisesQuery = useMatchingExerciseSearch(s, userId);

  useEffect(() => {
    if (matchingExercisesQuery.data && matchingExercisesQuery.data.length) {
      setMatchedExercises(matchingExercisesQuery.data);
    }
  }, [matchingExercisesQuery.isFetched]);

  return (
    <div>
      <input
        onChange={(e) => {
          setS(e.target.value);
        }}
        className='border-[1px] rounded-md rounded-b-none p-2'
        type='text'
        placeholder='Search for exercise...'
      />
      {matchedExercises && matchedExercises.length && (
        <div className='flex flex-col border-[1px] border-t-0 rounded-t-none rounded-sm border-b-slate-200'>
          {matchedExercises.map((exercise) => (
            <div
              className='p-2 hover:bg-slate-100 hover:cursor-pointer rounded-sm'
              key={uniqid()}
              onClick={() => {
                console.log(exercise.name);
              }}
            >
              {capitalize(exercise.name)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExerciseSearch;
