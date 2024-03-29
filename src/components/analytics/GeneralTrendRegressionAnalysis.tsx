import { useEffect, useState } from 'react';
import useLinearRegression from '../../hooks/useLinearRegression';
type GeneralTrendRegressionAnalysisProps = {
  exerciseId: string;
  average: boolean;
};
import useCustomMemo from '../../hooks/useCustomMemo';
import { useUser } from '../../utils/UserProvider';
function GeneralTrendRegressionAnalysis({
  exerciseId,
  average,
}: GeneralTrendRegressionAnalysisProps) {
  const [regressionSlope, setRegressionSlope] = useState<number>();
  const [positive, setPositive] = useState<boolean>();
  const [state, addToCache] = useCustomMemo();
  const userUnits = useUser()!.preferences.unit;

  const signOfSlope = (slope: number) => {
    const sign = Math.sign(slope);
    switch (sign) {
      case 1:
        setPositive(true);
        return;
      case 0:
        // 0 and -0 will both match 0 in a switch case so we can pick a sign and drop one case
        setPositive(true);
        return;
      case -1:
        setPositive(false);
        return;
      default:
        setPositive(true);
        break;
    }
  };

  useEffect(() => {
    // need to wait until the store has something
    // in it to get the next round of data
    // doesn't get triggered if the data takes too long
    let storeKey: string = '';
    if (average) storeKey = `${exerciseId}_Avg1RM`;
    else storeKey = `${exerciseId}_Abs1RM`;

    if (state && state[storeKey]) {
      const handleRegressionData = () => {
        const regressionData = useLinearRegression(state[storeKey]);
        setRegressionSlope(regressionData.equation[0]);
        signOfSlope(regressionData.equation[0]);
      };

      handleRegressionData();
    }
  }, [average, exerciseId]);

  return (
    <div className='flex justify-start items-center gap-1 text-sm'>
      <p className='font-semibold'>Performance Trend: </p>
      {regressionSlope && typeof positive !== 'undefined' && (
        <span className='flex justify-start items-center gap-2'>
          <p>
            {positive && '+'}
            {regressionSlope}
            {userUnits}
          </p>
          <img
            className={positive ? 'h-4' : 'h-4 transform rotate-90'}
            src={
              positive
                ? '/favicons/trend_arrow_positive.svg'
                : '/favicons/trend_arrow_negative.svg'
            }
          />
        </span>
      )}
    </div>
  );
}

export default GeneralTrendRegressionAnalysis;
