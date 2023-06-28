import RegressionAnalysis from './RegressionAnalysis';
import StandardsAnalysis from './StandardsAnalysis';

type ChartAnalysisProps = {
  exerciseId: string;
  showAbsolute: boolean;
};

function ChartAnalysis({ exerciseId, showAbsolute }: ChartAnalysisProps) {
  return (
    <div className=''>
      <>
        <RegressionAnalysis
          exerciseId={exerciseId}
          showAbsolute={showAbsolute}
        />
        <StandardsAnalysis />
      </>
    </div>
  );
}

export default ChartAnalysis;
