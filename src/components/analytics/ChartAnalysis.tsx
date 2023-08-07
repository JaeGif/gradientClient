import RegressionAnalysis from './RegressionAnalysis';
import StandardsAnalysis from './StandardsAnalysis';
import { exerciseInStandards } from '../../utils/fnSheet/utilities';
import { useUser } from '../../utils/UserProvider';
type ChartAnalysisProps = {
  exerciseId: string;
  showAbsolute: boolean;
};

function ChartAnalysis({ exerciseId, showAbsolute }: ChartAnalysisProps) {
  const userGender = useUser()!.gender;
  return (
    <div className='flex flex-col w-full justify-center gap-2 pl-6'>
      <RegressionAnalysis exerciseId={exerciseId} showAbsolute={showAbsolute} />
      {exerciseInStandards(exerciseId, userGender) && (
        <StandardsAnalysis exerciseId={exerciseId} average={!showAbsolute} />
      )}
    </div>
  );
}

export default ChartAnalysis;
