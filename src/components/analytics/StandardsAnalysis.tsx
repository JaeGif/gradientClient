import { useEffect, useState } from 'react';
import useNextHighestNumber from '../../hooks/useNextHighestNumber';
import { capitalize } from '../../utils/fnSheet/utilities';
import useCustomMemo from '../../hooks/useCustomMemo';
import { standards } from '../../data/standards';
import { useUser } from '../../utils/UserProvider';
type StandardsAnalysisProps = {
  exerciseId: string;
  average: boolean;
};
function StandardsAnalysis({ exerciseId, average }: StandardsAnalysisProps) {
  const [state, addToCache] = useCustomMemo();
  const [exerciseStandard, setExerciseStandard] = useState<any>();
  const [bestPerformance, setBestPerformance] = useState<number | undefined>();
  const [closestStandard, setClosestStandard] = useState<
    | {
        level: string;
        weight: number;
      }
    | undefined
  >();
  const userGender = useUser()!.gender;
  const userPreferenceWeight = useUser()!.preferences.unit;

  let tempStandard = exerciseStandard;
  let storeKey: string = '';

  if (!tempStandard) {
    for (let i = 0; i < standards.gender[userGender].length; i++) {
      if (standards.gender[userGender][i].exerciseId === exerciseId) {
        tempStandard = [
          {
            level: 'beginner',
            weight:
              standards.gender[userGender][i].level.beginner.weight[
                userPreferenceWeight
              ],
          },
          {
            level: 'novice',
            weight:
              standards.gender[userGender][i].level.novice.weight[
                userPreferenceWeight
              ],
          },
          {
            level: 'intermediate',
            weight:
              standards.gender[userGender][i].level.intermediate.weight[
                userPreferenceWeight
              ],
          },
          {
            level: 'advanced',
            weight:
              standards.gender[userGender][i].level.advanced.weight[
                userPreferenceWeight
              ],
          },
          {
            level: 'elite',
            weight:
              standards.gender[userGender][i].level.elite.weight[
                userPreferenceWeight
              ],
          },
        ];
        setExerciseStandard(tempStandard);
        break;
      }
    }
  }
  useEffect(() => {
    // need to wait until the store has something
    // in it to get the next round of data
    // doesn't get triggered if the data takes too long
    if (average) storeKey = `${exerciseId}_Avg1RM`;
    else storeKey = `${exerciseId}_Abs1RM`;
    if (state && state[storeKey] && exerciseStandard) {
      const lastPerformance: number =
        state[storeKey][state[storeKey].length - 1];
      const closestStandard = useNextHighestNumber(
        lastPerformance,
        exerciseStandard
      );
      setBestPerformance(lastPerformance);
      setClosestStandard(closestStandard);
    }
  }, [average, exerciseId, exerciseStandard]);

  return (
    <>
      {closestStandard && bestPerformance && (
        <div className='flex flex-wrap gap-2 sm:gap-10 text-sm'>
          <span className='flex gap-1'>
            <p className='text-sm font-semibold'>Next Level: </p>

            <p>
              {capitalize(closestStandard.level)} at {closestStandard.weight}
              {userPreferenceWeight}
            </p>
          </span>
          <span className='flex justify-center items-center gap-1'>
            <p className='font-semibold'>
              {capitalize(closestStandard.level)} Delta:{' '}
            </p>
            <p>
              {(closestStandard.weight - bestPerformance).toFixed(2)}
              {userPreferenceWeight}
            </p>
          </span>
        </div>
      )}
    </>
  );
}

export default StandardsAnalysis;
