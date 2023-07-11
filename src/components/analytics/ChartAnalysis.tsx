import RegressionAnalysis from './RegressionAnalysis';
import StandardsAnalysis from './StandardsAnalysis';
import { exerciseInStandards } from '../../utils/fnSheet/utilities';
type ChartAnalysisProps = {
  exerciseId: string;
  showAbsolute: boolean;
};
const userGender = 'm';

function ChartAnalysis({ exerciseId, showAbsolute }: ChartAnalysisProps) {
  return (
    <div className='min-w-fit'>
      <RegressionAnalysis exerciseId={exerciseId} showAbsolute={showAbsolute} />
      {exerciseInStandards(exerciseId, userGender) && (
        <StandardsAnalysis exerciseId={exerciseId} average={!showAbsolute} />
      )}
    </div>
  );
}

export default ChartAnalysis;
