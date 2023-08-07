import React, { useEffect, useState } from 'react';
import useLastestPerformances from '../../../hooks/useLatestPerformances';
import { useAuth } from '../../../utils/AuthProvider';
import { PerformanceFull, PerformedExercise } from '../../../types/Interfaces';
import ExerciseEntry from './ExerciseEntry';
import uniqid from 'uniqid';
import { useQueryClient } from '@tanstack/react-query';

type ExerciseLibraryProps = {
  searchedExerciseId?: string;
};

function ExerciseLibrary({ searchedExerciseId }: ExerciseLibraryProps) {
  const userId = useAuth()!.user!.id;
  const queryClient = useQueryClient();
  // map the users last 10 exercises here, paginate by 10
  const recentExercisesQuery = useLastestPerformances(
    userId,
    searchedExerciseId
  ).recentExerciseQuery;
  const [recentExercises, setRecentExercises] = useState<PerformanceFull[]>([]);
  useEffect(() => {
    if (recentExercisesQuery.data) {
      setRecentExercises(recentExercisesQuery.data);
    }
  }, [
    recentExercisesQuery.isFetched,
    searchedExerciseId,
    recentExercisesQuery.fetchStatus,
  ]);
  return (
    <div className='flex flex-col'>
      <span className='flex w-[calc(100%-2rem)] justify-between p-2 text-white bg-slate-700 sm:rounded-t-md'>
        <p>Exercise</p>
        <p>Performed Sets</p>
        <p>
          Date <em className='text-gray-500'></em>
        </p>
      </span>
      {recentExercises.length ? (
        recentExercises.map((performance) => (
          <ExerciseEntry key={uniqid()} data={performance} />
        ))
      ) : (
        <p className='text-gray-400 p-2'>No exercises match the query...</p>
      )}
    </div>
  );
}

export default ExerciseLibrary;
