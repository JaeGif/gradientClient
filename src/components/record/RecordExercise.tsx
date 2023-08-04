import React, { useEffect, useState } from 'react';
import useMatchingExerciseSearch from '../../hooks/useMatchingExerciseSearch';
import { useAuth } from '../../utils/AuthProvider';
import uniqid from 'uniqid';
import { capitalize } from '../../utils/fnSheet/utilities';
import SetPerformed from './SetPerformed';
import { useUser } from '../../utils/UserProvider';

type RecordExerciseProps = {
  handleExerciseId: Function;
  handleSets: Function;
  data: {
    exercise: {
      id: string;
      muscleGroupsId: string;
      name: string;
      reps?: number | undefined;
      sets?: number | undefined;
      standardized: boolean;
    };
    performedWorkout: string;
    user: string;
    sets: {
      reps?: number;
      weight?: number;
      unit: 'kg' | 'lb';
      logged: boolean;
    }[];
  };
  index: number;
  setCreatingExercise: Function;
};
function RecordExercise({
  handleExerciseId,
  handleSets,
  data,
  index,
  setCreatingExercise,
}: RecordExerciseProps) {
  const userUnit = useUser()!.preferences.unit;
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
    <div className='shadow-md p-6 rounded-sm flex flex-col gap-2'>
      {data.exercise && data.exercise.name ? (
        <div className='flex justify-between items-center'>
          <span className='flex gap-2 items-center '>
            <h2>{capitalize(data.exercise.name)}</h2>
            <img
              title='Change Exercise'
              onClick={() => {
                handleExerciseId(undefined, index);
              }}
              className='h-4 hover:cursor-pointer'
              alt='change exercise'
              src='/favicons/edit.svg'
            />
          </span>
          <img
            onClick={() => {
              handleSets(index, data.sets.length, {
                reps: undefined,
                weight: undefined,
                unit: userUnit,
              });
            }}
            title='Add Set'
            className='h-8 hover:cursor-pointer'
            alt='add new set'
            src='/favicons/new.svg'
          />
        </div>
      ) : (
        <div className='flex flex-col'>
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
                    handleExerciseId(exercise, index);
                  }}
                >
                  {capitalize(exercise.name)}
                </div>
              ))}
              <div className='p-2 text-sm text-blue-500 hover:text-blue-400 rounded-sm'>
                <p
                  onClick={() => {
                    setCreatingExercise(true);
                  }}
                  className='hover:cursor-pointer w-fit'
                >
                  Create new exercise...
                </p>
              </div>
            </div>
          )}
        </div>
      )}
      <SetPerformed
        handleSets={handleSets}
        setsData={data.sets}
        index={index}
      />
    </div>
  );
}

export default RecordExercise;
