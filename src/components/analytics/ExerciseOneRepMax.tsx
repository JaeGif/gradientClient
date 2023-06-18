import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import LineChart from '../charts/LineChart';
import { ChartOptions, DatasetController, Chart, Filler } from 'chart.js';
import use1RepMax from '../../hooks/use1RepMax';
import useRecentExerciseData from '../../hooks/useRecentExerciseData';
import useExerciseDateLabels from '../../hooks/useExerciseDateLabels';
import useMaxDataPoint from '../../hooks/useMaxDataPoint';
import useLineChartOptions from '../../hooks/useLineChartOptions';
import useLineChartDataSets from '../../hooks/useLineChartDataSets';

type ExerciseOneRepMaxProps = {
  exerciseId: string;
};
Chart.register(Filler);

function ExerciseOneRepMax({ exerciseId }: ExerciseOneRepMaxProps) {
  const [xLabels, setXLabels] = useState<string[]>([]);
  const [datasets, setDatasets] = useState<
    {
      label?: string | undefined;
      data: number[];
      borderColor?: string | undefined;
      backgroundColor?: string | undefined;
    }[]
  >();
  const [options, setOptions] = useState<ChartOptions>();
  const [timeFrame, setTimeFrame] = useState('30 days');
  const recentExerciseQuery = useRecentExerciseData(exerciseId);

  useEffect(() => {
    if (recentExerciseQuery.data && recentExerciseQuery.data.length !== 0) {
      const labels = useExerciseDateLabels(recentExerciseQuery);
      setXLabels(labels);
      const data = use1RepMax(recentExerciseQuery.data, false);

      if (data) {
        const datasetsPre = useLineChartDataSets(data);
        const maxExercise1RM = useMaxDataPoint(data);
        setDatasets(datasetsPre);
        const options = useLineChartOptions(
          recentExerciseQuery,
          maxExercise1RM,
          timeFrame
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

export default ExerciseOneRepMax;
