import RegressionAnalysis from './RegressionAnalysis';
import StandardsAnalysis from './StandardsAnalysis';

type ChartAnalysisProps = {
  exerciseId: string;
  showAbsolute: boolean;
};

function ChartAnalysis({ exerciseId, showAbsolute }: ChartAnalysisProps) {
  return (
    <div className='min-w-fit'>
      <RegressionAnalysis exerciseId={exerciseId} showAbsolute={showAbsolute} />
      <StandardsAnalysis exerciseId={exerciseId} average={!showAbsolute} />
    </div>
  );
}

export default ChartAnalysis;
