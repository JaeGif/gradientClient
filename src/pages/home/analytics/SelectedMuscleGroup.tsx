import React, { useEffect, useState } from 'react';
import { useLocation, useMatch } from 'react-router-dom';
import useMuscleSpecificExercises from '../../../hooks/useMuscleSpecificExercises';
import { useAuth } from '../../../utils/AuthProvider';
import AvgAbs1RepMaxToggle from '../../../components/analytics/AvgAbs1RepMaxToggle';
import uniqid from 'uniqid';
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin';
import { Exercise } from '../../../types/Interfaces';
import LoadingScreen from '../../../components/transtions/LoadingScreen';

function SelectedMuscleGroup() {
  const userId = useAuth()!.user!.id;
  let extension = useMatch('/analytics/muscleGroups/*')?.params['*']!;
  const location = useLocation();
  const [exercise, setExercise] = useState<Exercise[]>();
  // needs to get the idx of exercises that have the muscle group related
  const muscleSpecificExercisesQuery = useMuscleSpecificExercises(
    extension,
    userId
  );
  useEffect(() => {
    if (
      muscleSpecificExercisesQuery.data &&
      muscleSpecificExercisesQuery.data.length
    ) {
      let result = [];
      console.log(muscleSpecificExercisesQuery.data);
      for (let i = 0; i < muscleSpecificExercisesQuery.data.length; i++) {
        result.push(muscleSpecificExercisesQuery.data[i]);
      }
      setExercise(result);
    }
  }, [muscleSpecificExercisesQuery.isFetched, location.pathname]);
  return (
    <div className='flex flex-wrap justify-center items-center'>
      {muscleSpecificExercisesQuery.data &&
      muscleSpecificExercisesQuery.data.length &&
      exercise ? (
        <div className='flex flex-col gap-5 w-full'>
          {exercise.map((exercise, i, idxArr) => (
            <AvgAbs1RepMaxToggle
              exerciseName={exercise.name}
              key={uniqid()}
              exerciseId={exercise.id}
              i={i}
              idxArr={idxArr}
            />
          ))}
        </div>
      ) : muscleSpecificExercisesQuery.data &&
        muscleSpecificExercisesQuery.data.length === 0 ? (
        <p>No exercises in this category</p>
      ) : (
        <LoadingScreen />
      )}
    </div>
  );
}

export default SelectedMuscleGroup;
