import React from 'react';
import GeneralTrendRegressionAnalysis from './GeneralTrendRegressionAnalysis';
import RecentPerformanceDelta from './RecentPerformanceDelta';
import { UseQueryResult } from '@tanstack/react-query';
type RegressionAnalysisProps = {
  recentExerciseQuery: UseQueryResult<any, unknown>;
};
function RegressionAnalysis({ recentExerciseQuery }: RegressionAnalysisProps) {
  // regression analysis uses the slope of the line to show general progression rate.
  // Also shows the % change from the most recent attempt at the exercise.
  return (
    <div className='debug flex flex-col gap-2'>
      <GeneralTrendRegressionAnalysis />
      <RecentPerformanceDelta />
    </div>
  );
}

export default RegressionAnalysis;
