import { useEffect, useState } from 'react';
import usePerformedStandardsMax from '../../../hooks/usePerformedStandardsMax';
import { useAuth } from '../../../utils/AuthProvider';
import { compareExerciseProgressAgainstMaxPossible } from '../../../utils/fnSheet/utilities';
import { PolarChart } from '../../charts/PolarChart';
import { useUser } from '../../../utils/UserProvider';

function StrengthByMuscleGroup() {
  const userId = useAuth()!.user!.id;
  const userGender = useUser()!.gender;
  const userUnits = useUser()!.preferences.unit;
  const userWeight = useUser()!.weight.value;
  const [muscleGroupProgression, setMuscleGroupProgression] = useState<
    {
      name: string;
      data: number;
    }[]
  >();
  const userStandardPerformancesMax = usePerformedStandardsMax(
    userWeight,
    userId,
    userUnits
  );
  useEffect(() => {
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
        <div className='dark:bg-[rgb(35,35,35)] h-96 rounded-lg sm:w-1/4 sm:p-2 w-full sm:min-w-[200px] shadow-md flex justify-center'>
          <PolarChart dataset={muscleGroupProgression} />
        </div>
      )}
    </>
  );
}

export default StrengthByMuscleGroup;
