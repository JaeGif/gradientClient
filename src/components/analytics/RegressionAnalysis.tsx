import GeneralTrendRegressionAnalysis from './GeneralTrendRegressionAnalysis';
import RecentPerformanceDelta from './RecentPerformanceDelta';

type RegressionAnalysisProps = {
  exerciseId: string;
  showAbsolute: boolean;
};

function RegressionAnalysis({
  exerciseId,
  showAbsolute,
}: RegressionAnalysisProps) {
  // regression analysis uses the slope of the line to show general progression rate.
  // Also shows the % change from the most recent attempt at the exercise.

  return (
    <div className='flex flex-col gap-2'>
      <GeneralTrendRegressionAnalysis
        exerciseId={exerciseId}
        average={!showAbsolute}
      />
      <RecentPerformanceDelta exerciseId={exerciseId} average={!showAbsolute} />
    </div>
  );
}

export default RegressionAnalysis;
