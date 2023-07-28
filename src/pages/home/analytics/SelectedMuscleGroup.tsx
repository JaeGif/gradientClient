import React, { useEffect, useState } from 'react';
import { useLocation, useMatch } from 'react-router-dom';
import useMuscleSpecificExercises from '../../../hooks/useMuscleSpecificExercises';
import { useAuth } from '../../../utils/AuthProvider';
import AvgAbs1RepMaxToggle from '../../../components/analytics/AvgAbs1RepMaxToggle';
import uniqid from 'uniqid';
function SelectedMuscleGroup() {
  const userId = useAuth()!.user!.id;
  let extension = useMatch('/analytics/muscleGroups/*')?.params['*']!;
  const [exerciseIdx, setExerciseIdx] = useState<string[]>();
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
      for (let i = 0; i < muscleSpecificExercisesQuery.data.length; i++) {
        result.push(muscleSpecificExercisesQuery.data[i].id);
      }
      setExerciseIdx(result);
    }
  }, [muscleSpecificExercisesQuery.isSuccess]);
  return (
    <div>
      {muscleSpecificExercisesQuery.data &&
      muscleSpecificExercisesQuery.data.length &&
      exerciseIdx ? (
        <div className='flex flex-col gap-5'>
          {exerciseIdx.map((id, i, idxArr) => (
            <AvgAbs1RepMaxToggle
              key={uniqid()}
              exerciseId={id}
              i={i}
              idxArr={idxArr}
            />
          ))}
        </div>
      ) : muscleSpecificExercisesQuery.data &&
        muscleSpecificExercisesQuery.data.length === 0 ? (
        <p>No exercises in this category</p>
      ) : (
        <>Loading</>
      )}
    </div>
  );
}

export default SelectedMuscleGroup;
