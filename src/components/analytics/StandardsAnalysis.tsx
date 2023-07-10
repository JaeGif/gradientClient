import React, { useEffect, useState } from 'react';
import useNextHighestNumber from '../../hooks/useNextHighestNumber';
import { averageArray } from '../../utils/fnSheet/utilities';
import useCustomMemo from '../../hooks/useCustomMemo';
import { standards } from '../../data/standards';
import useRecentExerciseData from '../../hooks/useRecentExerciseData';
const userGender = 'm';
const userPreferenceWeight = 'kg';
type StandardsAnalysisProps = {
  exerciseId: string;
  average: boolean;
};
function StandardsAnalysis({ exerciseId, average }: StandardsAnalysisProps) {
  const [state, addToCache] = useCustomMemo();
  const [exerciseStandard, setExerciseStandard] = useState<any>();
  const [closestStandard, setClosestStandard] = useState<
    | {
        level: string;
        weight: number;
      }
    | undefined
  >();
  let tempStandard = exerciseStandard;
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
    let storeKey: string = '';
    if (average) storeKey = `${exerciseId}_Avg1RM`;
    else storeKey = `${exerciseId}_Abs1RM`;
    console.log('check 1');

    if (state && state[storeKey] && exerciseStandard) {
      console.log('check 2');
      const lastPerformance = state[storeKey][state[storeKey].length - 1];
      console.log(lastPerformance);
      const closestStandard = useNextHighestNumber(
        lastPerformance,
        exerciseStandard
      );
      console.log('check 3');
      setClosestStandard(closestStandard);
    }
  }, [average, exerciseId, exerciseStandard]);

  return (
    <div>
      Closest: {closestStandard ? <p>{closestStandard.level}</p> : <>Loading</>}
    </div>
  );
}

export default StandardsAnalysis;
