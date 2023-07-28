import React, { useEffect, useState } from 'react';
import useMatchingExerciseSearch from '../../hooks/useMatchingExerciseSearch';
import useMuscleSpecificExercises from '../../hooks/useMuscleSpecificExercises';
import { useAuth } from '../../utils/AuthProvider';
import uniqid from 'uniqid';
import { capitalize } from '../../utils/fnSheet/utilities';
import SetPerformed from './SetPerformed';
type SetType = {
  weight: number;
  reps: number;
  units: 'kg' | 'lb';
  rtf?: number;
};
function RecordExercise() {
  const [s, setS] = useState<string>();
  const [setCount, setSetCount] = useState([0]);
  const [selectedExercise, setSelectedExercise] = useState<{
    id: string;
    muscleGroupsId: string;
    name: string;
    reps?: number;
    sets?: number;
    standardized: boolean;
  }>();
  const [sets, setSets] = useState<SetType[]>([]);
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
  const handleLogNewSet = (set: SetType) => {
    setSets((prev) => [...prev, set]);
  };
  useEffect(() => {
    if (matchingExercisesQuery.data && matchingExercisesQuery.data.length) {
      setMatchedExercises(matchingExercisesQuery.data);
    }
  }, [matchingExercisesQuery.isFetched]);
  return (
    <div className='shadow-md p-6 rounded-sm flex flex-col gap-2'>
      {selectedExercise ? (
        <div className='flex justify-between items-center'>
          <span className='flex gap-2 items-center '>
            <h2>{capitalize(selectedExercise.name)}</h2>
            <img
              title='Change Exercise'
              onClick={() => {
                setSelectedExercise(undefined);
              }}
              className='h-4 hover:cursor-pointer'
              alt='change exercise'
              src='/favicons/edit.svg'
            />
          </span>
          <img
            onClick={() => {
              setSetCount((prev) => [...prev, 0]);
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
      <SetPerformed logSet={handleLogNewSet} setCount={setCount} />
    </div>
  );
}

export default RecordExercise;
