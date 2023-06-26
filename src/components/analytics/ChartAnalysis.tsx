import RegressionAnalysis from './RegressionAnalysis';
import StandardsAnalysis from './StandardsAnalysis';
import useRecentExerciseData from '../../hooks/useRecentExerciseData';

type ChartAnalysisProps = {
  exerciseId: string;
};

function ChartAnalysis({ exerciseId }: ChartAnalysisProps) {
  const recentExerciseQuery = useRecentExerciseData(exerciseId);
  return (
    <div className=''>
      {recentExerciseQuery.data ? (
        <>
          <RegressionAnalysis data={recentExerciseQuery.data} />
          <StandardsAnalysis />
        </>
      ) : (
        <>looking up data</>
      )}
    </div>
  );
}

export default ChartAnalysis;
