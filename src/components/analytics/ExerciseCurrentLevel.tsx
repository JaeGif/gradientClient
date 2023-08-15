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
import { useUser } from '../../utils/UserProvider';
import { useTheme } from '../../utils/ThemeProvider';
type ExerciseCurrentLevelProps = {
  exerciseId: string;
  recentExerciseQuery: UseQueryResult<any, unknown>;
};
Chart.register(Filler);

function ExerciseCurrentLevel({
  exerciseId,
  recentExerciseQuery,
}: ExerciseCurrentLevelProps) {
  const theme = useTheme().theme;

  const [xLabels, setXLabels] = useState<string[]>([]);
  const [datasets, setDatasets] = useState<any>();
  const [options, setOptions] = useState<any>();
  const [timeFrame, setTimeFrame] = useState('<= 30 Performances');
  const [state, addToCache] = useCustomMemo();

  const userWeight = useUser()!.weight;
  const userGender = useUser()!.gender;
  const userUnits = useUser()!.preferences.unit;
  useEffect(() => {
    if (recentExerciseQuery.data && recentExerciseQuery.data.length !== 0) {
      const labels = useExerciseDateLabels(recentExerciseQuery);
      setXLabels(labels);
      // check cache for data, if it's not there, just do the calculation
      // O(1) hash table so constant time for cache lookup
      let data;
      let isPullups = false;
      if (exerciseId === '6a10f694-25bd-4824-b2a2-bfb21b4167c4') {
        isPullups = true;
      }
      data = use1RepMax(
        recentExerciseQuery.data,
        true,
        userUnits,
        isPullups,
        userWeight.value
      );

      if (data) {
        const datasetsPre = useLineChartDataSets(
          data,
          useLinearRegression(data),
          'average'
        );
        setDatasets(datasetsPre);
        const options = useLineChartOptions(
          recentExerciseQuery,
          data,
          timeFrame,
          userGender,
          false,
          theme
        );
        setOptions(options);
      }
    }
  }, [recentExerciseQuery.isFetched]);

  return (
    <div className='h-full w-full'>
      {datasets && (
        <LineChart labels={xLabels} datasets={datasets} options={options} />
      )}
    </div>
  );
}

export default ExerciseCurrentLevel;
