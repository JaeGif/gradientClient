import React, { useEffect } from 'react';
import RegressionAnalysis from './RegressionAnalysis';
import StandardsAnalysis from './StandardsAnalysis';
import useRecentExerciseData from '../../hooks/useRecentExerciseData';

type ChartAnalysisProps = {
  exerciseId: string;
};

function ChartAnalysis({ exerciseId }: ChartAnalysisProps) {
  const recentExerciseQuery = useRecentExerciseData(exerciseId);

  useEffect(() => {
    if (recentExerciseQuery.isFetched) console.log('fresh');
    else console.log('cached');

    console.log(recentExerciseQuery.data);
  }, [recentExerciseQuery.fetchStatus]);

  return (
    <div className='debug'>
      <RegressionAnalysis recentExerciseQuery={recentExerciseQuery} />
      <StandardsAnalysis />
    </div>
  );
}

export default ChartAnalysis;
