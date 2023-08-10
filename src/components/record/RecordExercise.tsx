import React, { useContext, useEffect, useState } from 'react';
import useMatchingExerciseSearch from '../../hooks/useMatchingExerciseSearch';
import { useAuth } from '../../utils/AuthProvider';
import uniqid from 'uniqid';
import { capitalize } from '../../utils/fnSheet/utilities';
import SetPerformed from './SetPerformed';
import { useUser } from '../../utils/UserProvider';
import { ThemeContext } from '../../App';

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
  const theme = useContext(ThemeContext);
  const userUnit = useUser()!.preferences.unit;
  const [s, setS] = useState<string>();
  const [isSearching, setIsSearching] = useState(false);
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
    <div className='dark:bg-[rgb(35,35,35)] shadow-md p-6 rounded-sm flex flex-col gap-2'>
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
              src={
                theme === 'dark'
                  ? '/favicons/edit-white.svg'
                  : '/favicons/edit.svg'
              }
            />
          </span>
          <div
            onClick={() => {
              handleSets(index, data.sets.length, {
                reps: undefined,
                weight: undefined,
                unit: userUnit,
              });
            }}
            className='text-center flex justify-center items-center hover:cursor-pointer'
          >
            <p className='text-lg'>Add Set</p>
            <img
              title='Add Set'
              className='h-8'
              alt='add new set'
              src={
                theme === 'dark'
                  ? '/favicons/new-white.svg'
                  : '/favicons/new.svg'
              }
            />
          </div>
        </div>
      ) : (
        <div className='flex flex-col'>
          <input
            onFocus={() => setIsSearching(true)}
            onChange={(e) => {
              setS(e.target.value);
            }}
            className='dark:bg-[rgb(35,35,35)] border-[1px] rounded-md rounded-b-none p-2'
            type='text'
            placeholder='Search for exercise...'
          />
          {isSearching && (
            <div className='flex flex-col border-[1px] border-t-0 rounded-t-none rounded-sm border-b-slate-200'>
              {matchedExercises &&
                matchedExercises.length &&
                matchedExercises.map((exercise) => (
                  <div
                    className='p-2 hover:bg-slate-100 dark:hover:dark:bg-[rgb(40,40,40)] hover:cursor-pointer rounded-sm'
                    key={uniqid()}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsSearching(false);
                      handleExerciseId(exercise, index);
                    }}
                  >
                    {capitalize(exercise.name)}
                  </div>
                ))}
              <div className=' p-2 text-sm text-blue-500 hover:text-blue-400 rounded-sm'>
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
