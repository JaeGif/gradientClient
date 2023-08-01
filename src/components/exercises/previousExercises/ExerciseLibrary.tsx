import React, { useEffect, useState } from 'react';
import useRecentExerciseData from '../../../hooks/useRecentExerciseData';
import useLastestPerformances from '../../../hooks/useLatestPerformances';
import { useAuth } from '../../../utils/AuthProvider';
import { PerformanceFull, PerformedExercise } from '../../../types/Interfaces';
import ExerciseEntry from './ExerciseEntry';
import uniqid from 'uniqid';
function ExerciseLibrary() {
  const userId = useAuth()!.user!.id;
  // map the users last 10 exercises here, paginate by 10
  const recentExercisesQuery = useLastestPerformances(userId);
  const [recentExercises, setRecentExercises] = useState<PerformanceFull[]>([]);

  useEffect(() => {
    if (recentExercisesQuery.data) {
      console.log(recentExercisesQuery.data);
      setRecentExercises(recentExercisesQuery.data);
    }
  }, [recentExercisesQuery.isFetched]);
  return (
    <div className='flex flex-col'>
      <span className='flex justify-between p-2 text-white bg-slate-700 sm:rounded-t-md'>
        <p>Exercise</p>
        <p>Performed Sets</p>
        <p>
          Date <em className='text-gray-500'></em>
        </p>
      </span>
      {recentExercises.length &&
        recentExercises.map((performance) => (
          <ExerciseEntry key={uniqid()} data={performance} />
        ))}
    </div>
  );
}

export default ExerciseLibrary;
