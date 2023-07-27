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
  console.log(extension);
  const muscleSpecificExercisesQuery = useMuscleSpecificExercises(
    extension,
    userId
  );
  useEffect(() => {
    if (
      muscleSpecificExercisesQuery.data &&
      muscleSpecificExercisesQuery.data.length
    ) {
      console.log(muscleSpecificExercisesQuery.data);
      let result = [];
      for (let i = 0; i < muscleSpecificExercisesQuery.data.length; i++) {
        result.push(muscleSpecificExercisesQuery.data[i].id);
      }
      console.log(muscleSpecificExercisesQuery.data);
      setExerciseIdx(result);
    }
  }, [muscleSpecificExercisesQuery.isSuccess]);
  return (
    <div>
      {muscleSpecificExercisesQuery.data &&
      muscleSpecificExercisesQuery.data.length &&
      exerciseIdx ? (
        exerciseIdx.map((id) => (
          <AvgAbs1RepMaxToggle key={uniqid()} exerciseId={id} />
        ))
      ) : (
        <>Loading</>
      )}
    </div>
  );
}

export default SelectedMuscleGroup;
