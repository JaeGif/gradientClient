import React, { useState, useEffect } from 'react';
import { capitalize } from '../../../utils/fnSheet/utilities';
import uniqid from 'uniqid';
import { useAuth } from '../../../utils/AuthProvider';
import useMatchingExerciseSearch from '../../../hooks/useMatchingExerciseSearch';

type ExerciseSearchProps = {
  setSearchedExercise: Function;
};
function ExerciseSearch({ setSearchedExercise }: ExerciseSearchProps) {
  const [s, setS] = useState<string>();
  const [searching, setSearching] = useState(false);
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
  useEffect(() => {
    if (s === '' || !s) {
      setSearching(false);
    }
  }, [s]);
  return (
    <div className='min-w-[33vw]'>
      <input
        onChange={(e) => {
          setSearching(true);
          setS(e.target.value);
        }}
        className='border-[1px] rounded-md rounded-b-none p-2 w-full dark:bg-[rgb(40,40,40)]'
        type='text'
        placeholder='Search for exercise...'
      />
      {searching && matchedExercises && matchedExercises.length && (
        <div className='dark:bg-[rgb(30,30,30)] flex flex-col border-[1px] border-t-0 rounded-t-none rounded-sm border-b-slate-200 max-h-[35vh] overflow-scroll'>
          {matchedExercises.map((exercise) => (
            <div
              className='p-2 dark:hover:bg-[rgb(40,40,40)] hover:bg-slate-100 hover:cursor-pointer rounded-sm'
              key={uniqid()}
              onClick={() => {
                setSearching(false);
                setSearchedExercise(exercise);
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
