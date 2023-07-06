import React, { useEffect, useState } from 'react';
import useNextHighestNumber from '../../hooks/useNextHighestNumber';
import { averageArray } from '../../utils/fnSheet/utilities';
import useCustomMemo from '../../hooks/useCustomMemo';
import { standards } from '../../data/standards';
const userGender = 'm';
type StandardsAnalysisProps = {
  exerciseId: string;
  average: boolean;
};
function StandardsAnalysis({ exerciseId, average }: StandardsAnalysisProps) {
  const [state, addToCache] = useCustomMemo();
  const [exerciseStandard, setExerciseStandard] = useState<any>();
  const [closestStandardWeight, setClosestStandardWeight] = useState<
    number | undefined
  >();

  useEffect(() => {
    let tempStandard = exerciseStandard;
    if (!tempStandard) {
      for (let i = 0; i < standards.gender[userGender].length; i++) {
        if (standards.gender[userGender][i].exerciseId === exerciseId) {
          tempStandard = standards.gender[userGender][i].level;
          setExerciseStandard(tempStandard);
          break;
        }
      }
    }
    // need to wait until the store has something
    // in it to get the next round of data
    // doesn't get triggered if the data takes too long
    let storeKey: string = '';
    if (average) storeKey = `${exerciseId}_Avg1RM`;
    else storeKey = `${exerciseId}_Abs1RM`;

    if (state && state[storeKey] && exerciseStandard) {
      const averagePerformance = averageArray(state[storeKey]);
      const closestStandardWeightVal = useNextHighestNumber(
        averagePerformance,
        tempStandard
      );
      setClosestStandardWeight(closestStandardWeightVal);
    }
  }, [average, exerciseId]);

  return (
    <div>
      Closest: {closestStandardWeight ? closestStandardWeight : <>Loading</>}
    </div>
  );
}

export default StandardsAnalysis;
