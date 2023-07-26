import React, { useContext, useEffect, useState } from 'react';
import useRecentExerciseData from '../../../hooks/useRecentExerciseData';
import usePerformedStandardsMax from '../../../hooks/usePerformedStandardsMax';
import { useAuth } from '../../../utils/AuthProvider';
import { compareExerciseProgressAgainstMaxPossible } from '../../../utils/fnSheet/utilities';
import { PolarChart } from '../../charts/PolarChart';

function StrengthByMuscleGroup() {
  const userId = useAuth()!.user!.id;
  const userGender = useAuth()!.user!.gender;
  const userUnits = useAuth()!.user!.preferences.unit;
  const [muscleGroupProgression, setMuscleGroupProgression] = useState<
    {
      name: string;
      data: number;
    }[]
  >();
  const userStandardPerformancesMax = usePerformedStandardsMax(userId);
  useEffect(() => {
    console.log(userStandardPerformancesMax.data);
    if (!userStandardPerformancesMax.data) return;
    let checkArr = [];
    for (let i = 0; i < userStandardPerformancesMax.data.length; i++) {
      checkArr.push(userStandardPerformancesMax.data[i] || 0);
    }
    setMuscleGroupProgression(
      compareExerciseProgressAgainstMaxPossible(checkArr, {
        userGender,
        userUnits,
      })
    );
  }, [userStandardPerformancesMax.isFetched]);
  return (
    <>
      {muscleGroupProgression && (
        <div className='h-96 rounded-lg w-1/4 p-2 min-w-[200px] shadow-md flex justify-center items-center'>
          <PolarChart dataset={muscleGroupProgression} />
        </div>
      )}
    </>
  );
}

export default StrengthByMuscleGroup;
