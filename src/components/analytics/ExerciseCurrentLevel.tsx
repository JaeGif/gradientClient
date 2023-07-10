import React, { useEffect, useState } from 'react';
import LineChart from '../charts/LineChart';
import { Chart, Filler } from 'chart.js';
import use1RepMax from '../../hooks/use1RepMax';
import useRecentExerciseData from '../../hooks/useRecentExerciseData';
import useExerciseDateLabels from '../../hooks/useExerciseDateLabels';
import useLineChartOptions from '../../hooks/useLineChartOptions';
import useLineChartDataSets from '../../hooks/useLineChartDataSets';
import useLinearRegression from '../../hooks/useLinearRegression';
import useCustomMemo from '../../hooks/useCustomMemo';
import { UseQueryResult } from '@tanstack/react-query';

type ExerciseCurrentLevelProps = {
  exerciseId: string;
  recentExerciseQuery: UseQueryResult<any, unknown>;
};
Chart.register(Filler);

function ExerciseCurrentLevel({
  exerciseId,
  recentExerciseQuery,
}: ExerciseCurrentLevelProps) {
  const [xLabels, setXLabels] = useState<string[]>([]);
  const [datasets, setDatasets] = useState<
    {
      label?: string | undefined;
      data: number[];
      borderColor?: string | undefined;
      backgroundColor?: string | undefined;
    }[]
  >();
  const [options, setOptions] = useState<any>();
  const [timeFrame, setTimeFrame] = useState('30 days');
  const [state, addToCache] = useCustomMemo();

  useEffect(() => {
    if (recentExerciseQuery.data && recentExerciseQuery.data.length !== 0) {
      const labels = useExerciseDateLabels(recentExerciseQuery);
      setXLabels(labels);
      // check cache for data, if it's not there, just do the calculation
      // O(1) hash table so constant time for cache lookup
      let data;
      if (!state || !state[`${exerciseId}_Avg1RM`]) {
        data = use1RepMax(recentExerciseQuery.data, true);
        addToCache(`${exerciseId}_Avg1RM`, data);
      } else {
        data = state[`${exerciseId}_Avg1RM`];
      }
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
          false
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
