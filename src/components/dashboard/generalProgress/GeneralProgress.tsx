import RadarLevels from '../../charts/RadarLevels';
import { standards } from '../../../data/standards';
import { useAuth } from '../../../utils/AuthProvider';
import usePerformedStandardsMax from '../../../hooks/usePerformedStandardsMax';
import { useEffect, useState } from 'react';
import { useUser } from '../../../utils/UserProvider';
function GeneralProgressChart() {
  // use max values from last 30 days on standard exercises as the users current values
  // standards can be added programmatically from the DB
  const [userExerciseLevels, setUserExerciseLevels] = useState<
    { exercise: string; value: number }[] | null
  >(null);

  const userGender = useUser()!.gender;
  const userWeight = useUser()!.weight.value;
  const genderedStandards = standards.gender[userGender];
  const units = useUser()!.preferences.unit;
  const userId = useAuth()!.user!.id;
  // bench, pullup, squat, deadlift, shoulder press
  const userStandardsPerformancesMax = usePerformedStandardsMax(
    userWeight,
    userId,
    units
  );

  useEffect(() => {
    if (userStandardsPerformancesMax && userStandardsPerformancesMax.data) {
      const userPerformances: {
        exercise: string;
        value: number;
      }[] = [
        {
          exercise: 'Bench',
          value: userStandardsPerformancesMax.data[0] || 0,
        },
        {
          exercise: 'Pullups',
          value: userStandardsPerformancesMax.data[1] || 0,
        },
        {
          exercise: 'Squat',
          value: userStandardsPerformancesMax.data[2] || 0,
        },
        {
          exercise: 'Deadlift',
          value: userStandardsPerformancesMax.data[3] || 0,
        },
        {
          exercise: 'Shoulder Press',
          value: userStandardsPerformancesMax.data[4] || 0,
        },
      ];

      setUserExerciseLevels((prev) => userPerformances);
    }
  }, [
    userStandardsPerformancesMax.isFetched,
    userStandardsPerformancesMax.isSuccess,
    userStandardsPerformancesMax.fetchStatus,
    units,
  ]);
  return (
    <>
      {userExerciseLevels && (
        <div className='dark:bg-[rgb(35,35,35)] flex justify-center w-full sm:w-2/3 rounded-lg sm:p-2 sm:min-w-[420px] shadow-md'>
          <RadarLevels
            units={units}
            exerciseLevels={{
              untrained: [
                genderedStandards[0].level.untrained.weight[units],
                genderedStandards[1].level.untrained.weight[units],
                genderedStandards[2].level.untrained.weight[units],
                genderedStandards[3].level.untrained.weight[units],
                genderedStandards[4].level.untrained.weight[units],
              ],
              beginner: [
                genderedStandards[0].level.beginner.weight[units],
                genderedStandards[1].level.beginner.weight[units],
                genderedStandards[2].level.beginner.weight[units],
                genderedStandards[3].level.beginner.weight[units],
                genderedStandards[4].level.beginner.weight[units],
              ],
              novice: [
                genderedStandards[0].level.novice.weight[units],
                genderedStandards[1].level.novice.weight[units],
                genderedStandards[2].level.novice.weight[units],
                genderedStandards[3].level.novice.weight[units],
                genderedStandards[4].level.novice.weight[units],
              ],
              intermediate: [
                genderedStandards[0].level.intermediate.weight[units],
                genderedStandards[1].level.intermediate.weight[units],
                genderedStandards[2].level.intermediate.weight[units],
                genderedStandards[3].level.intermediate.weight[units],
                genderedStandards[4].level.intermediate.weight[units],
              ],
              advanced: [
                genderedStandards[0].level.advanced.weight[units],
                genderedStandards[1].level.advanced.weight[units],
                genderedStandards[2].level.advanced.weight[units],
                genderedStandards[3].level.advanced.weight[units],
                genderedStandards[4].level.advanced.weight[units],
              ],
              elite: [
                genderedStandards[0].level.elite.weight[units],
                genderedStandards[1].level.elite.weight[units],
                genderedStandards[2].level.elite.weight[units],
                genderedStandards[3].level.elite.weight[units],
                genderedStandards[4].level.elite.weight[units],
              ],
            }}
            userExerciseLevels={userExerciseLevels}
          />
        </div>
      )}
    </>
  );
}

export default GeneralProgressChart;
