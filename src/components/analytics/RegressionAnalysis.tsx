import React from 'react';
import GeneralTrendRegressionAnalysis from './GeneralTrendRegressionAnalysis';
import RecentPerformanceDelta from './RecentPerformanceDelta';
import { PerformedExercise } from '../../types/Interfaces';

type RegressionAnalysisProps = {
  data: [] | PerformedExercise[] | undefined;
};

function RegressionAnalysis({ data }: RegressionAnalysisProps) {
  // regression analysis uses the slope of the line to show general progression rate.
  // Also shows the % change from the most recent attempt at the exercise.

  return (
    <div className='flex flex-col gap-2'>
      <GeneralTrendRegressionAnalysis data={data} />
      <RecentPerformanceDelta />
    </div>
  );
}

export default RegressionAnalysis;
