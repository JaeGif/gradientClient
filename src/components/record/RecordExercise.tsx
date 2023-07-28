import React, { useEffect, useState } from 'react';
import useMatchingExerciseSearch from '../../hooks/useMatchingExerciseSearch';
import useMuscleSpecificExercises from '../../hooks/useMuscleSpecificExercises';
import { useAuth } from '../../utils/AuthProvider';
import uniqid from 'uniqid';
import { capitalize } from '../../utils/fnSheet/utilities';
function RecordExercise() {
  const [s, setS] = useState<string>();
  const [selectedExercise, setSelectedExercise] = useState<{
    id: string;
    muscleGroupsId: string;
    name: string;
    reps?: number;
    sets?: number;
    standardized: boolean;
  }>();
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
    <div className='shadow-md p-6'>
      {selectedExercise ? (
        <span className='flex gap-5 items-center '>
          <h2>{capitalize(selectedExercise.name)}</h2>
          <img
            onClick={() => {
              setSelectedExercise(undefined);
            }}
            className='h-6 hover:cursor-pointer'
            alt='change exercise'
            src='/favicons/edit.svg'
          />
        </span>
      ) : (
        <div className='flex flex-col gap-2'>
          <input
            onChange={(e) => {
              setS(e.target.value);
            }}
            className='border-2 rounded-md p-2'
            type='text'
            placeholder='Search for exercise...'
          />
          {matchedExercises && matchedExercises.length && (
            <div className='flex flex-col'>
              {matchedExercises.map((exercise) => (
                <div
                  className='p-2 hover:bg-slate-100 hover:cursor-pointer rounded-sm'
                  key={uniqid()}
                  onClick={() => {
                    setSelectedExercise(exercise);
                  }}
                >
                  {capitalize(exercise.name)}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default RecordExercise;
