import { useEffect, useState } from 'react';
import LineChart from '../charts/LineChart';
import { Chart, Filler } from 'chart.js';
import use1RepMax from '../../hooks/use1RepMax';
import useExerciseDateLabels from '../../hooks/useExerciseDateLabels';
import useLineChartOptions from '../../hooks/useLineChartOptions';
import useLineChartDataSets from '../../hooks/useLineChartDataSets';
import useLinearRegression from '../../hooks/useLinearRegression';
import useCustomMemo from '../../hooks/useCustomMemo';
import { UseQueryResult } from '@tanstack/react-query';
import { useAuth } from '../../utils/AuthProvider';
import { useUser } from '../../utils/UserProvider';
type ExerciseOneRepMaxProps = {
  exerciseId: string;
  recentExerciseQuery: UseQueryResult<any, unknown>;
};
Chart.register(Filler);

function ExerciseOneRepMax({
  exerciseId,
  recentExerciseQuery,
}: ExerciseOneRepMaxProps) {
  const [xLabels, setXLabels] = useState<string[]>([]);
  const [datasets, setDatasets] = useState<any>();
  const [options, setOptions] = useState<any>();
  const [timeFrame, setTimeFrame] = useState('30 days'); // set this is fetched at right intervals
  const [state, addToCache] = useCustomMemo();

  const userWeight = useUser()!.weight;
  const userGender = useUser()!.gender;

  useEffect(() => {
    if (recentExerciseQuery.data && recentExerciseQuery.data.length !== 0) {
      const labels = useExerciseDateLabels(recentExerciseQuery);
      setXLabels(labels);

      // check cache for data, if it's not there, just do the calculation
      // O(1) hash table so constant time for cache lookup
      let data;
      if (!state || !state[`${exerciseId}_Abs1RM`]) {
        let isPullups = false;
        if (exerciseId === '6a10f694-25bd-4824-b2a2-bfb21b4167c4') {
          isPullups = true;
        }
        data = use1RepMax(
          recentExerciseQuery.data,
          false,
          isPullups,
          userWeight
        ); // returns a number[] of the 1rm for each set
        addToCache(`${exerciseId}_Abs1RM`, data);
      } else {
        data = state[`${exerciseId}_Abs1RM`];
      }

      if (data) {
        const datasetsPre = useLineChartDataSets(
          data,
          useLinearRegression(data),
          'absolute'
        );
        setDatasets(datasetsPre);
        const options = useLineChartOptions(
          recentExerciseQuery,
          data,
          timeFrame,
          userGender,
          true
        );
        setOptions(options);
      }
    }
  }, [recentExerciseQuery.isFetched]);

  return (
    <div className='w-full'>
      {datasets && (
        <LineChart labels={xLabels} datasets={datasets} options={options} />
      )}
    </div>
  );
}

export default ExerciseOneRepMax;
